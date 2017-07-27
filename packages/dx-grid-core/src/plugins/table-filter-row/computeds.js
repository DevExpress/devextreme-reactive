import { TABLE_FILTER_TYPE } from './constants';

export const tableHeaderRowsWithFilter = (headerRows, rowHeight) =>
  [...headerRows, { type: TABLE_FILTER_TYPE, id: 0, height: rowHeight }];
