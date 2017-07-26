import { DETAIL_TYPE } from './constants';
import { DATA_TYPE } from '../table-view/constants';

export const isDetailRowExpanded = (expandedRows, rowId) => expandedRows.indexOf(rowId) > -1;
export const isDetailToggleTableCell = (row, column) =>
  column.type === DETAIL_TYPE && row.type === DATA_TYPE;
export const isDetailTableRow = row => row.type === DETAIL_TYPE;
