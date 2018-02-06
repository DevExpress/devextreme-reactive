import { TABLE_DETAIL_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isDetailRowExpanded = (expandedDetailRowIds, rowId) =>
  expandedDetailRowIds.indexOf(rowId) > -1;
export const isDetailToggleTableCell = (tableRow, tableColumn) =>
  tableColumn.type === TABLE_DETAIL_TYPE && tableRow.type === TABLE_DATA_TYPE;
export const isDetailTableRow = tableRow => tableRow.type === TABLE_DETAIL_TYPE;
