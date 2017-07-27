import { TABLE_SELECT_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';
import { TABLE_HEADING_TYPE } from '../table-header-row/constants';

export const isSelectTableCell = (row, column) =>
  column.type === TABLE_SELECT_TYPE && row.type === TABLE_DATA_TYPE;
export const isSelectAllTableCell = (row, column) =>
  column.type === TABLE_SELECT_TYPE && row.type === TABLE_HEADING_TYPE;
