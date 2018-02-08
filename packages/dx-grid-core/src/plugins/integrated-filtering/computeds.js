import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';

const proxy = a => a;
const OR = a => b => c => a(c) || b(c);
const AND = a => b => c => a(c) && b(c);

const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

const fillGaps = filters => filters.reduce((acc, filter) => {
  if (Array.isArray(filter)) {
    acc.push(fillGaps(filter));
    return acc;
  }
  if (typeof (acc[acc.length - 1]) === 'object' && typeof (filter) === 'object') {
    acc.push('AND');
  }
  acc.push(filter);
  return acc;
}, []);


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
        } else if (predicate(node.root)) {
          acc.push(node.root);
          return acc;
        }
      }

      if (predicate(node)) {
        acc.push(node);
        return acc;
      }

      return acc;
    },
    [],
  );

const filterHierarchicalRows = (rows, predicate, getRowLevelKey, isGroupRow) => {
  const tree = rowsToTree(rows, getRowLevelKey);

  const filteredTree = filterTree(tree, (row) => {
    if (isGroupRow(row)) {
      if (row.collapsedRows) {
        return row.collapsedRows.findIndex(predicate) > -1;
      }
      return false;
    }
    return predicate(row);
  });

  return treeToRows(filteredTree);
};

export const filteredRows = (
  rows,
  filters,
  getCellValue,
  getColumnPredicate,
  isGroupRow,
  getRowLevelKey,
) => {
  if (!filters.length || !rows.length) return rows;

  const getPredicateFromFilter = (filter) => {
    const { columnName, ...filterConfig } = filter;
    const customPredicate = getColumnPredicate && getColumnPredicate(columnName);
    const columnPredicate = customPredicate || defaultPredicate;

    return row => columnPredicate(getCellValue(row, columnName), filterConfig, row);
  };

  const predicateGenerator = filterExprs => filterExprs.reduce(
    (prevPredicate, filter) => {
      let operator = AND;
      if (typeof (filter) === 'string') {
        if (filter === 'AND') {
          operator = AND;
        } else if (filter === 'OR') {
          operator = OR;
        }
        return operator(prevPredicate);
      }

      if (Array.isArray(filter)) {
        return prevPredicate(predicateGenerator(filter));
      }

      return prevPredicate(getPredicateFromFilter(filter));
    }
    , proxy,
  );

  const predicate = predicateGenerator(fillGaps(filters));

  if (!getRowLevelKey) {
    return rows.filter(predicate);
  }

  return filterHierarchicalRows(rows, predicate, getRowLevelKey, isGroupRow);
};
