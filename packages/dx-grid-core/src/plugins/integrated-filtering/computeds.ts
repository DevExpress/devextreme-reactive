import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';
import { PureComputed } from '@devexpress/dx-core';
import {
  Row, Filter, FilterPredicate,
  FilterExpression, GetCellValueFn, RowsWithCollapsedRowsMetaMap,
  UnwrapRowsComputed, FilteredRowsFn, FilterHierarchicalRowsFn,
  CompiledPredicate, GetColumnPredicateFn, FilteredCollapsedRowsGetterFn, TreeNode,
} from '../../types';

const operators = {
  or: (predicates: CompiledPredicate[]) => (row: Row) => (
    predicates.reduce((acc, predicate) => acc || predicate(row), false)
  ),
  and: (predicates: CompiledPredicate[]) => (row: Row) => (
    predicates.reduce((acc, predicate) => acc && predicate(row), true)
  ),
};

const toLowerCase = (value: any) => String(value).toLowerCase();

const operationPredicates: { [key: string]: FilterPredicate } = {
  contains: (value, filter) => toLowerCase(value)
    .indexOf(toLowerCase(filter.value)) > -1,

  notContains: (value, filter) => toLowerCase(value)
    .indexOf(toLowerCase(filter.value)) === -1,

  startsWith: (value, filter) => toLowerCase(value)
    .startsWith(toLowerCase(filter.value)),

  endsWith: (value, filter) => toLowerCase(value)
    .endsWith(toLowerCase(filter.value)),

  equal: (value, filter) => String(value) === String(filter.value),
  notEqual: (value, filter) => String(value) !== String(filter.value),

  greaterThan: (value, filter) => value > filter.value!,
  greaterThanOrEqual: (value, filter) => value >= filter.value!,
  lessThan: (value, filter) => value < filter.value!,
  lessThanOrEqual: (value, filter) => value <= filter.value!,
};

export const defaultFilterPredicate: FilterPredicate = (value, filter) => {
  const operation = filter.operation || 'contains';
  return operationPredicates[operation](value, filter);
};

const filterTree: PureComputed<[TreeNode[], CompiledPredicate]> = (tree, predicate) => tree.reduce(
  (acc, node) => {
    if (node[NODE_CHECK]) {
      const filteredChildren = filterTree(node.children, predicate) as TreeNode[];
      if (filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren,
        });
        return acc;
      }
      if (predicate(node.root, true)) {
        acc.push(node.root);
        return acc;
      }
      return acc;
    }

    if (predicate(node)) {
      acc.push(node);
      return acc;
    }

    return acc;
  },
  [] as TreeNode[],
);

const filterHierarchicalRows: FilterHierarchicalRowsFn = (
  rows, predicate, getRowLevelKey, getCollapsedRows,
) => {
  const tree = rowsToTree(rows, getRowLevelKey);
  const collapsedRowsMeta: any[] = [];

  const filteredTree = filterTree(tree, (row, isNode) => {
    if (isNode) {
      const collapsedRows = getCollapsedRows && getCollapsedRows(row);
      if (collapsedRows && collapsedRows.length) {
        const filteredCollapsedRows = collapsedRows.filter(predicate);
        collapsedRowsMeta.push([row, filteredCollapsedRows]);
        return !!filteredCollapsedRows.length || predicate(row);
      }
      if (predicate(row)) {
        collapsedRowsMeta.push([row, []]);
        return true;
      }
      return false;
    }
    return predicate(row);
  });

  return { rows: treeToRows(filteredTree), collapsedRowsMeta: new Map(collapsedRowsMeta) };
};

const buildPredicate: PureComputed<
  [FilterExpression, GetCellValueFn, GetColumnPredicateFn],
  CompiledPredicate
> = (
  initialFilterExpression, getCellValue, getColumnPredicate,
) => {
  const getSimplePredicate = (filter: Filter) => {
    const { columnName } = filter;
    const customPredicate = getColumnPredicate && getColumnPredicate(columnName);
    const predicate = customPredicate || defaultFilterPredicate;
    return (row: Row) => predicate(getCellValue(row, columnName), filter, row);
  };

  const getOperatorPredicate: any = (filterExpression: FilterExpression) => {
    const build = operators[toLowerCase(filterExpression.operator)];
    return build && build(filterExpression.filters.map(getPredicate));
  };

  const getPredicate = (filterExpression: any) => (
    getOperatorPredicate(filterExpression)
    || getSimplePredicate(filterExpression)
  );

  return getPredicate(initialFilterExpression);
};

export const filteredRows: FilteredRowsFn = (
  rows, filterExpression, getCellValue, getColumnPredicate, getRowLevelKey, getCollapsedRows,
) => {
  if (!(filterExpression && Object.keys(filterExpression).length && rows.length)) {
    // tslint:disable-next-line:no-object-literal-type-assertion
    return { rows } as Partial<RowsWithCollapsedRowsMetaMap>;
  }

  const predicate = buildPredicate(
    filterExpression,
    getCellValue,
    getColumnPredicate,
  );

  return getRowLevelKey
    ? filterHierarchicalRows(rows, predicate, getRowLevelKey, getCollapsedRows)
    : { rows: rows.filter(predicate) };
};

export const filteredCollapsedRowsGetter: FilteredCollapsedRowsGetterFn = (
  { collapsedRowsMeta },
) => row => collapsedRowsMeta && collapsedRowsMeta.get(row);

export const unwrappedFilteredRows: UnwrapRowsComputed = ({ rows }) => rows;
