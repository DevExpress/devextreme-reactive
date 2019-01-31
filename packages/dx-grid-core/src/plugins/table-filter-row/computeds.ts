import { PureComputed } from '@devexpress/dx-core';
import { TABLE_FILTER_TYPE } from './constants';
import { TableRow } from '../../types';

export const tableHeaderRowsWithFilter: PureComputed<[TableRow[], number]> = (
  headerRows, rowHeight,
) => [
  ...headerRows,
  { key: TABLE_FILTER_TYPE.toString(), type: TABLE_FILTER_TYPE, height: rowHeight }];
