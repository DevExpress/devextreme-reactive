import { TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';

export const isTotalSummaryTableCell = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_TOTAL_SUMMARY_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isGroupSummaryTableCell = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_GROUP_SUMMARY_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isTreeSummaryTableCell = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_TREE_SUMMARY_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isTotalSummaryTableRow = tableRow => tableRow.type === TABLE_TOTAL_SUMMARY_TYPE;
export const isGroupSummaryTableRow = tableRow => tableRow.type === TABLE_GROUP_SUMMARY_TYPE;
export const isTreeSummaryTableRow = tableRow => tableRow.type === TABLE_TREE_SUMMARY_TYPE;

export const getColumnSummaries = (summaryItems, columnName, summaryValues) => summaryItems
  .map((item, index) => [item, index])
  .filter(([item]) => item.columnName === columnName)
  .map(([item, index]) => ({ type: item.type, value: summaryValues[index] }));
