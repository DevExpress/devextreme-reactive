import mergeSort from '../../utils/merge-sort';
import { rowsToTree, treeToRows } from '../../utils/hierarchical-data';

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const createCompare = (sorting, getColumnCompare, getComparableValue) =>
  Array.from(sorting)
    .reverse()
    .reduce(
      (prevCompare, columnSorting) => {
        const { columnName } = columnSorting;
        const inverse = columnSorting.direction === 'desc';
        const columnCompare = (getColumnCompare && getColumnCompare(columnName)) || defaultCompare;

        return (aRow, bRow) => {
          const a = getComparableValue(aRow, columnName);
          const b = getComparableValue(bRow, columnName);
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
  const sorted = mergeSort(tree, tree[0].node ? groupCompare : compare);
  sorted.forEach((row) => {
    if (row.items && row.items.length) {
      const sortedItems = sortTree(row.items, compare, groupCompare);
      row.items.splice(0, row.items.length, ...sortedItems);
    }
  });

  return sorted;
};

const sortGroupedRows = (
  rows,
  sorting,
  isGroupRow,
  getRowLevelKey,
  getCellValue,
  getColumnCompare,
) => {
  const tree = rowsToTree(rows, isGroupRow, getRowLevelKey);
  const getGroupRowValue = (row, field) => {
    const { node } = row;
    return node.groupedBy === field ? node.value : undefined;
  };

  const rowCompare = createCompare(sorting, getColumnCompare, getCellValue);
  const groupCompare = createCompare(sorting, getColumnCompare, getGroupRowValue);
  const sortedTree = sortTree(tree, rowCompare, groupCompare);

  return treeToRows(sortedTree);
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

  if (getRowLevelKey) {
    return sortGroupedRows(
      rows,
      sorting,
      isGroupRow,
      getRowLevelKey,
      getCellValue,
      getColumnCompare,
    );
  }

  const rowCompare = createCompare(sorting, getColumnCompare, getCellValue);
  return mergeSort(Array.from(rows), rowCompare);
};
