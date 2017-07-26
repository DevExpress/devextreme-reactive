import { FILTER_TYPE } from './constants';

export const tableHeaderRowsWithFilter = (headerRows, rowHeight) =>
  [...headerRows, { type: FILTER_TYPE, id: 0, height: rowHeight }];
