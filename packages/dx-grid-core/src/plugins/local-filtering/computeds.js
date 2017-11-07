import { rowsToTree, treeToRows } from '../../utils/hierarchical-data';

const toLowerCase = value => String(value).toLowerCase();

const defaultPredicate = (value, filter) =>
  toLowerCase(value).indexOf(toLowerCase(filter.value)) > -1;

const filterTree = (tree, predicate) => {
  const filtered = tree.filter((item) => {
    const { groupRow, items } = item;
    const collapsedRows = groupRow ? groupRow.collapsedRows : undefined;

    if (items && items.length) {
      items.splice(0, items.length, ...filterTree(items, predicate));
    } else if (collapsedRows) {
      groupRow.collapsedRows.splice(
        0,
        collapsedRows.length,
        ...filterTree(collapsedRows, predicate),
      );
    }

    return predicate(item);
  });

  return filtered;
};

const rowHasChildren = (row) => {
  const { items, groupRow } = row;
  return items.length > 0 || (groupRow.collapsedRows && groupRow.collapsedRows.length > 0);
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
        return rowHasChildren(row);
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
      if (row.collapsedRows && row.collapsedRows.length) {
        return {
          ...row,
          collapsedRows: [...row.collapsedRows],
        };
      }
      return { ...row };
    });

    const tree = rowsToTree(copy, isGroupRow, getRowLevelKey);
    const filtered = filterTree(tree, compoundPredicate);

    return treeToRows(filtered);
  }

  return rows.filter(compoundPredicate);
};

