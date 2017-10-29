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

const rowsToTree = (rows, isGroupRow, getRowLevelKey) =>
  rows.reduce((acc, item) => {
    const { tree, processedGroups } = acc;

    if (isGroupRow(item)) {
      const treeItem = { groupRow: item, items: [] };
      const key = getRowLevelKey(item);

      if (!processedGroups.length) {
        tree.push(treeItem);
      } else {
        const existingGroupItem =
          processedGroups.find(g => getRowLevelKey(g.groupRow) === key);

        if (!existingGroupItem) {
          const [parentGroup] = processedGroups.slice(-1);
          treeItem.parentIndex = processedGroups.length - 1;

          parentGroup.items.push(treeItem);
        } else {
          const { parentIndex } = existingGroupItem;
          if (parentIndex !== undefined) {
            processedGroups[parentIndex].items.push(treeItem);
          } else {
            tree.push(treeItem);
          }
        }
      }

      processedGroups.push(treeItem);
    } else if (!processedGroups.length) {
      tree.push(item);
    } else {
      processedGroups.slice(-1)[0].items.push(item);
    }

    return acc;
  }, { tree: [], processedGroups: [] }).tree;

const treeToRows = (tree, rows = []) =>
  tree.reduce((acc, item) => {
    const { groupRow, items } = item;

    if (groupRow) {
      acc.push(groupRow);
      if (items && items.length) {
        treeToRows(items, acc);
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, rows);

const sortTree = (tree, compare, groupCompare) => {
  const sorted = mergeSort(tree, tree[0].groupRow ? groupCompare : compare);
  sorted.forEach((row) => {
    if (row.items && row.items.length) {
      const sortedItems = sortTree(row.items, compare, groupCompare);
      row.items.splice(0, row.items.length, ...sortedItems);
    }
  });

  return sorted;
};

export const sortedRows = (
  rows,
  sorting,
  getCellValue,
  getColumnCompare,
  isGroupRow,
  getRowLevelKey,
) => {
  if (!sorting.length) return rows;
  const compare = createCompare(sorting, getColumnCompare, getCellValue);

  if (isGroupRow) {
    const tree = rowsToTree(rows, isGroupRow, getRowLevelKey);
    const groupCompare = createCompare(sorting, getColumnCompare, (item, field) => {
      const { groupRow } = item;
      return groupRow.groupedBy === field ? groupRow.value : undefined;
    });
    const sortedTree = sortTree(tree, compare, groupCompare);

    return treeToRows(sortedTree);
  }

  return mergeSort(Array.from(rows), compare);
};
