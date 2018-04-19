import { TABLE_GROUP_TYPE } from './constants';

export const isGroupTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && tableRow.row.groupedBy === tableColumn.column.name;
export const isGroupIndentTableCell = (tableRow, tableColumn, grouping) => {
  if (tableRow.type !== TABLE_GROUP_TYPE || tableColumn.type !== TABLE_GROUP_TYPE) return false;
  if (tableRow.row.groupedBy === tableColumn.column.name) return false;
  const rowGroupIndex = grouping.findIndex(columnGrouping =>
    columnGrouping.columnName === tableRow.row.groupedBy);
  const columnGroupIndex = grouping.findIndex(columnGrouping =>
    columnGrouping.columnName === tableColumn.column.name);
  return columnGroupIndex < rowGroupIndex;
};
export const isGroupTableRow = tableRow => tableRow.type === TABLE_GROUP_TYPE;
