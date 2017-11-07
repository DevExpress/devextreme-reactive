import mergeSort from '../../utils/merge-sort';
import { rowsToTree, treeToRows } from '../../utils/hierarchical-data';

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

const sortTree = (tree, compare, groupCompare) => {
  if (!tree.length) return tree;
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

  if (getRowLevelKey) {
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
