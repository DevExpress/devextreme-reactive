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

  return filterHierarchicalRows(rows, predicate, getRowLevelKey, isGroupRow);
};
