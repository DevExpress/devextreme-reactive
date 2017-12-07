import { TABLE_DATA_TYPE } from './../table/constants';

export const visibleTableColumns = (tableColumns, hiddenColumns) =>
  tableColumns.filter(tableColumn =>
    tableColumn.type !== TABLE_DATA_TYPE || hiddenColumns.indexOf(tableColumn.column.name) === -1);
