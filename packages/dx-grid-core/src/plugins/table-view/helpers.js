import { DATA_TYPE, NODATA_TYPE } from './constants';

export const isNoDataTableRow = row => row.type === NODATA_TYPE;
export const isDataTableCell = (row, column) => row.type === DATA_TYPE && column.type === DATA_TYPE;
export const isHeaderStubTableCell = (row, headerRows) => headerRows.indexOf(row) > -1;
