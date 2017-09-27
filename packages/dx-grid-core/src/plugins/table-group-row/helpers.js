import { TABLE_GROUP_TYPE } from './constants';

export const isGroupTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && tableRow.gridRow.groupedBy === tableColumn.column.name;
export const isGroupIndentTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && tableRow.gridRow.groupedBy !== tableColumn.column.name;
export const isGroupTableRow = tableRow => tableRow.type === TABLE_GROUP_TYPE;
