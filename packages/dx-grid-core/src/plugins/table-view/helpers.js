import { TABLE_DATA_TYPE, TABLE_NODATA_TYPE } from './constants';

export const isNoDataTableRow = row => row.type === TABLE_NODATA_TYPE;
export const isDataTableCell = (row, column) => row.type === TABLE_DATA_TYPE && column.type === TABLE_DATA_TYPE;
export const isHeaderStubTableCell = (row, headerRows) => headerRows.indexOf(row) > -1;
