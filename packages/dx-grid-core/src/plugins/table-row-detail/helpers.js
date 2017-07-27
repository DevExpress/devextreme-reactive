import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table-view/constants';

export const isDetailRowExpanded = (expandedRows, rowId) => expandedRows.indexOf(rowId) > -1;
export const isDetailToggleTableCell = (row, column) =>
  column.type === TABLE_DETAIL_TYPE && row.type === TABLE_DATA_TYPE;
export const isDetailTableRow = row => row.type === TABLE_DETAIL_TYPE;
