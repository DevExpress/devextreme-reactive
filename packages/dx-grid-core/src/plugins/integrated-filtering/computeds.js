import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';

const AND = predicates => row =>
  predicates.reduce((acc, predicate) => acc && predicate(row), true);

const OR = predicates => row =>
  predicates.reduce((acc, predicate) => acc || predicate(row), false);

const operators = { or: OR, and: AND };

const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

const filterTree = (tree, predicate) =>
  tree.reduce(
    (acc, node) => {
      if (node[NODE_CHECK]) {
        const filteredChildren = filterTree(node.children, predicate);
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
    [],
  );

const filterHierarchicalRows = (rows, predicate, getRowLevelKey, getCollapsedRows) => {
  const tree = rowsToTree(rows, getRowLevelKey);
  const collapsedRowsMeta = [];

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

const buildPredicate = (
  initialFilterExpression,
  getCellValue,
  getColumnPredicate,
) => {
  const getSimplePredicate = (filterExpression) => {
    const { columnName } = filterExpression;
    const customPredicate = getColumnPredicate && getColumnPredicate(columnName);
    const predicate = customPredicate || defaultPredicate;
    return row =>
      predicate(getCellValue(row, columnName), filterExpression, row);
  };

  const getOperatorPredicate = (filterExpression) => {
    const build = operators[toLowerCase(filterExpression.operator)];
    // eslint-disable-next-line no-use-before-define
    return build && build(filterExpression.filters.map(getPredicate));
  };

  const getPredicate = filterExpression =>
    getOperatorPredicate(filterExpression) ||
    getSimplePredicate(filterExpression);

  return getPredicate(initialFilterExpression);
};

export const filteredRows = (
  rows,
  filterExpression,
  getCellValue,
  getColumnPredicate,
  getRowLevelKey,
  getCollapsedRows,
) => {
  if (!(filterExpression && Object.keys(filterExpression).length && rows.length)) {
    return { rows };
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

export const filteredCollapsedRowsGetter = ({ collapsedRowsMeta }) =>
  row => collapsedRowsMeta && collapsedRowsMeta.get(row);

export const unwrappedFilteredRows = ({ rows }) => rows;
