import mergeSort from '../../utils/merge-sort';
import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';

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

const sortTree = (tree, compare) => {
  const sortedTree = tree.map((node) => {
    if (node[NODE_CHECK]) {
      return {
        ...node,
        children: sortTree(node.children, compare),
      };
    }
    return node;
  });

  return mergeSort(sortedTree, (a, b) =>
    compare(a[NODE_CHECK] ? a.root : a, b[NODE_CHECK] ? b.root : b));
};

const sortHierarchicalRows = (rows, compare, getRowLevelKey) => {
  const tree = rowsToTree(rows, getRowLevelKey);

  const sortedTree = sortTree(tree, compare);

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
  if (!sorting.length || !rows.length) return rows;

  if (!getRowLevelKey) {
    const compare = createCompare(sorting, getColumnCompare, getCellValue);
    return mergeSort(Array.from(rows), compare);
  }

  const compare = createCompare(sorting, getColumnCompare, (row, columnName) => {
    if (isGroupRow(row)) {
      if (row.groupedBy === columnName) {
        return row.value;
      }
      return undefined;
    }
    return getCellValue(row, columnName);
  });
  return sortHierarchicalRows(
    rows,
    compare,
    getRowLevelKey,
  );
};
