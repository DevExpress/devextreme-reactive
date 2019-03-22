import { PureComputed } from '@devexpress/dx-core';
import mergeSort from '../../utils/merge-sort';
import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';
import {
  Row, GetRowLevelKeyFn, CompareFn, CreateCompareFn, SortedRowsFn, TreeNode,
} from '../../types';

const defaultCompare = (a: any, b: any) => {
  if (a === b) return 0;

  if (a === null) {
    return b === undefined ? -1 : 1;
  }
  if (a === undefined) {
    return 1;
  }
  if (b === null || b === undefined) {
    return -1;
  }
  return a < b ? -1 : 1;
};

const createCompare: CreateCompareFn = (
  sorting, getColumnCompare, getComparableValue,
) => sorting.reduceRight((prevCompare, columnSorting) => {
  const { columnName } = columnSorting;
  const inverse = columnSorting.direction === 'desc';
  const columnCompare = (getColumnCompare && getColumnCompare(columnName)) || defaultCompare;

  return (aRow: Row, bRow: Row) => {
    const a = getComparableValue(aRow, columnName);
    const b = getComparableValue(bRow, columnName);
    const result = columnCompare(a, b);

    if (result !== 0) {
      return inverse ? -result : result;
    }
    return prevCompare(aRow, bRow);
  };
}, (...args: any[]) => 0);

const sortTree: PureComputed<[TreeNode[], CompareFn]> = (tree, compare) => {
  const sortedTree = tree.map((node) => {
    if (node[NODE_CHECK]) {
      return {
        ...node,
        children: sortTree(node.children, compare),
      };
    }
    return node;
  });

  return mergeSort(
    sortedTree, (a, b) => compare(a[NODE_CHECK] ? a.root : a, b[NODE_CHECK] ? b.root : b),
  );
};

const sortHierarchicalRows: PureComputed<[Row[], CompareFn, GetRowLevelKeyFn]> = (
  rows, compare, getRowLevelKey,
) => {
  const tree = rowsToTree(rows, getRowLevelKey);

  const sortedTree = sortTree(tree, compare);

  return treeToRows(sortedTree);
};

export const sortedRows: SortedRowsFn = (
  rows, sorting, getCellValue, getColumnCompare, isGroupRow, getRowLevelKey,
) => {
  if (!sorting.length || !rows.length) return rows;

  let compare;
  if (!getRowLevelKey) {
    compare = createCompare(sorting, getColumnCompare, getCellValue);
    return mergeSort(rows.slice(), compare);
  }

  compare = createCompare(sorting, getColumnCompare, (row, columnName) => {
    if (isGroupRow && isGroupRow(row)) {
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
