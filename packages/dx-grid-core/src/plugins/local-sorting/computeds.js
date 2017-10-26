import mergeSort from '../../utils/merge-sort';

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const createCompare = (sorting, getColumnCompare, getCellValue) =>
  Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) => {
        const { columnName } = columnSorting;
        const inverse = columnSorting.direction === 'desc';
        const columnCompare = (getColumnCompare && getColumnCompare(columnName)) || defaultCompare;

        return (aRow, bRow) => {
          const a = getCellValue(aRow, columnName);
          const b = getCellValue(bRow, columnName);
          const result = columnCompare(a, b);

          if (result !== 0) {
            return inverse ? -result : result;
          }
          return prevCompare(aRow, bRow);
        };
      },
      () => 0,
    );

const prepareRows = (rows, isGroupRow) => rows.reduce((acc, item) => {
  const { key: groupKey } = item;
  const { processed, groupKeys } = acc;

  if (isGroupRow(item)) {
    const groupItem = { item, items: [] };

    if (!groupKeys.size) {
      processed.push(groupItem);
    } else {
      const parentKey = groupKey.replace(`|${item.value}`, '');
      const parent = groupKeys.get(parentKey);

      if (parent) {
        parent.items.push(groupItem);
      } else {
        processed.push(groupItem);
      }
    }

    groupKeys.set(groupKey, groupItem);
    return acc;
  }
  if (!groupKeys.size) {
    processed.push(item);
  } else {
    const parentKey = Array.from(groupKeys.keys())[groupKeys.size - 1];
    groupKeys.get(parentKey).items.push(item);
  }
  return acc;
}, { processed: [], groupKeys: new Map() }).processed;

const sortPreparedRows = (rows, compare, groupCompare) => {
  const sorted = mergeSort(rows, rows[0].item && rows[0].item.groupedBy ? groupCompare : compare);

  sorted.forEach((row) => {
    if (row.items && row.items.length) {
      const sortedItems = sortPreparedRows(row.items, compare, groupCompare);
      row.items.splice(0, row.items.length, ...sortedItems);
    }
  });

  return sorted;
};

const makePlain = (rows, processed = []) => {
  const result = rows.reduce((acc, row) => {
    const { item } = row;

    if (item) {
      acc.push(item);
      if (row.items && row.items.length) {
        makePlain(row.items, acc);
      }
    } else {
      acc.push(row);
    }
    return acc;
  }, processed);

  return result;
};

export const sortedRows = (
  rows,
  sorting,
  getCellValue,
  getColumnCompare,
  isGroupRow,
) => {
  if (!sorting.length) return rows;
  const compare = createCompare(sorting, getColumnCompare, getCellValue);

  if (isGroupRow) {
    const preparedRows = prepareRows(rows, isGroupRow);
    const groupCompare = createCompare(sorting, getColumnCompare, (row, field) => {
      const { item } = row;
      if (item.groupedBy === field) return item.value;
      return undefined;
    });
    const sortedPreparedRows = sortPreparedRows(preparedRows, compare, groupCompare);

    return makePlain(sortedPreparedRows);
  }

  return mergeSort(Array.from(rows), compare);
};
