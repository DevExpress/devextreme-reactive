import { TABLE_FILTER_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isFilterTableCell = (row, column) =>
  row.type === TABLE_FILTER_TYPE && column.type === TABLE_DATA_TYPE;
