import { NODE_CHECK, rowsToTree, treeToRows } from '../../utils/hierarchical-data';

const any = () => true;
const none = () => false;

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
  anyInRow = false,
) => {
  if (!filters.length || !rows.length) return rows;

  const predicateGenerator = operator => (prevPredicate, filter) => (row) => {
    const { columnName, ...filterConfig } = filter;
    const customPredicate = getColumnPredicate && getColumnPredicate(columnName);
    const columnPredicate = customPredicate || defaultPredicate;

    return operator(
      columnPredicate(getCellValue(row, columnName), filterConfig, row),
      prevPredicate(row),
    );
  };

  const orPredicate = predicateGenerator((a, b) => a || b);
  const andPredicate = predicateGenerator((a, b) => a && b);

  const predicate = filters.reduce(
    anyInRow ? orPredicate : andPredicate,
    anyInRow ? none : any,
  );

  if (!getRowLevelKey) {
    return rows.filter(predicate);
  }

  return filterHierarchicalRows(rows, predicate, getRowLevelKey, isGroupRow);
};
