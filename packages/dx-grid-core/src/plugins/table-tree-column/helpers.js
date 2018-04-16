import { TABLE_DATA_TYPE } from '../table/constants';

export const isTreeTableCell = (tableRow, tableColumn, forColumnName) =>
  tableRow.type === TABLE_DATA_TYPE && tableColumn.type === TABLE_DATA_TYPE
  && tableColumn.column.name === forColumnName;
