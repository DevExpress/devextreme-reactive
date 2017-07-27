import { TABLE_HEADING_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isHeadingTableCell = (row, column) =>
  row.type === TABLE_HEADING_TYPE && column.type === TABLE_DATA_TYPE;
