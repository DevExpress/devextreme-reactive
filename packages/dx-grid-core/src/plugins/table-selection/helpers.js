import { SELECT_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';
import { HEADING_TYPE } from '../table-header-row/constants';

export const isSelectTableCell = (row, column) =>
  column.type === SELECT_TYPE && row.type === DATA_TYPE;
export const isSelectAllTableCell = (row, column) =>
  column.type === SELECT_TYPE && row.type === HEADING_TYPE;
