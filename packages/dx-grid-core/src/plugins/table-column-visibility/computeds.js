import { TABLE_DATA_TYPE } from './../table/constants';

export const visibleTableColumns = (tableColumns, hiddenColumnNames) =>
  tableColumns.filter(tableColumn =>
    tableColumn.type !== TABLE_DATA_TYPE ||
    hiddenColumnNames.indexOf(tableColumn.column.name) === -1);
