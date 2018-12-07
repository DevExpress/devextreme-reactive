import { TABLE_FILTER_TYPE } from './constants';

export const tableHeaderRowsWithFilter = (headerRows, rowHeight) => [
  ...headerRows,
  { key: TABLE_FILTER_TYPE.toString(), type: TABLE_FILTER_TYPE, height: rowHeight }];
