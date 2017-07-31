import { TABLE_GROUP_TYPE } from './constants';

export const isGroupTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && tableRow.id.startsWith(`${tableColumn.id}_`);
export const isGroupIndentTableCell = (tableRow, tableColumn) =>
  tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && !tableRow.id.startsWith(tableColumn.id);
