import { FILTER_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';

export const isFilterTableCell = (row, column) =>
  row.type === FILTER_TYPE && column.type === DATA_TYPE;
