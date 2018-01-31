import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';

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

const filterHierarchicalRows = (rows, predicate, getRowLevelKey, getCollapsedRows) => {
  const tree = rowsToTree(rows, getRowLevelKey);

  const filteredTree = filterTree(tree, (row) => {
    if (getCollapsedRows && getCollapsedRows(row)) {
      return getCollapsedRows(row).findIndex(predicate) > -1 || predicate(row);
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
  getRowLevelKey,
  getCollapsedRows,
) => {
  if (!filters.length || !rows.length) return rows;

  const predicate = filters.reduce(
    (prevPredicate, filter) => {
      const { columnName, ...filterConfig } = filter;
      const customPredicate = getColumnPredicate && getColumnPredicate(columnName);
      const columnPredicate = customPredicate || defaultPredicate;

      return (row) => {
        const result = columnPredicate(getCellValue(row, columnName), filterConfig, row);
        return result && prevPredicate(row);
      };
    },
    () => true,
  );

  if (!getRowLevelKey) {
    return rows.filter(predicate);
  }

  return filterHierarchicalRows(rows, predicate, getRowLevelKey, getCollapsedRows);
};

export const filteredCollapsedRowsGetter =
  (getCollapsedRows, filters, getCellValue, getColumnPredicate) =>
    (row) => {
      if (!getCollapsedRows) return undefined;
      const collapsedRows = getCollapsedRows(row);
      if (!collapsedRows || !collapsedRows.length) return collapsedRows;
      return filteredRows(
        collapsedRows,
        filters,
        getCellValue,
        getColumnPredicate,
      );
    };
