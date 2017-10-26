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

const sortGroupTree = (tree, compare, groupCompare) => {
  const sorted = mergeSort(tree, tree[0].groupRow ? groupCompare : compare);
  // TODO: refactor it
  sorted.forEach((row) => {
    if (row.items && row.items.length) {
      const sortedItems = sortGroupTree(row.items, compare, groupCompare);
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
  groupTree,
  unwrappedGroupTree,
) => {
  if (!sorting.length) return rows;
  const compare = createCompare(sorting, getColumnCompare, getCellValue);

  if (groupTree) {
    const groupedTree = groupTree(rows);
    const groupCompare = createCompare(sorting, getColumnCompare, (item, field) => {
      const { groupRow } = item;
      return groupRow.groupedBy === field ? groupRow.value : undefined;
    });
    const sortedGroupedTree = sortGroupTree(groupedTree, compare, groupCompare);

    return unwrappedGroupTree(sortedGroupedTree);
  }

  return mergeSort(Array.from(rows), compare);
};
