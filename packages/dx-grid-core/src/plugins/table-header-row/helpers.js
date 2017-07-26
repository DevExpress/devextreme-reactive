import { HEADING_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';

export const isHeadingTableCell = (row, column) =>
  row.type === HEADING_TYPE && column.type === DATA_TYPE;
