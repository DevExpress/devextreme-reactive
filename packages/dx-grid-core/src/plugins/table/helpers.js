import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';

export const isDataTableCell = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_DATA_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isHeaderStubTableCell = (tableRow, headerRows) => headerRows.indexOf(tableRow) > -1;
export const isDataTableRow = tableRow => tableRow.type === TABLE_DATA_TYPE;
export const isNoDataTableRow = tableRow => tableRow.type === TABLE_NODATA_TYPE;
export const isNoDataTableCell = (
  tableColumn, tableColumns,
) => tableColumns.indexOf(tableColumn) === 0;
