import { rowsToTree, treeToRows } from '../../utils/hierarchical-data';

const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

const filterTree = (tree, predicate) => {
  const filtered = tree.filter((item) => {
    const { groupRow, items } = item;
    const collapsedItems = groupRow ? groupRow.collapsedItems : undefined;

    if (items && items.length) {
      items.splice(0, items.length, ...filterTree(items, predicate));
    } else if (collapsedItems) {
      groupRow.collapsedItems.splice(
        0,
        collapsedItems.length,
        ...filterTree(collapsedItems, predicate),
      );
    }

    return predicate(item);
  });

  return filtered;
};

export const filteredRows = (
  rows,
  filters,
  getCellValue,
  getColumnPredicate,
  isGroupRow,
  getRowLevelKey,
) => {
  if (!filters.length) return rows;

  const compoundPredicate = filters.reduce(
    (prevCompare, filter) => (row) => {
      if (isGroupRow && row.groupRow) {
        const { items, groupRow } = row;
        return items.length > 0 || groupRow.collapsedItems.length > 0;
      }
      const { columnName, ...filterConfig } = filter;
      const predicate = (getColumnPredicate && getColumnPredicate(columnName)) || defaultPredicate;
      return prevCompare(row) && predicate(getCellValue(row, columnName), filterConfig, row);
    },
    () => true,
  );

  if (isGroupRow) {
    const copy = rows.map((row) => {
      if (!isGroupRow(row)) return row;
      return {
        ...row,
        collapsedItems: [...row.collapsedItems],
      };
    });

    const tree = rowsToTree(copy, isGroupRow, getRowLevelKey);
    const filtered = filterTree(tree, compoundPredicate);

    return treeToRows(filtered);
  }

  return rows.filter(compoundPredicate);
};

