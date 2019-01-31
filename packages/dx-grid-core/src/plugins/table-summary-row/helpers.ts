import {
  TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE,
} from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { GetColumnSummariesFn, IsSpecificCellFn, IsSpecificRowFn, SummaryItem } from '../../types';

export const isTotalSummaryTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_TOTAL_SUMMARY_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isGroupSummaryTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_GROUP_SUMMARY_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isTreeSummaryTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => tableRow.type === TABLE_TREE_SUMMARY_TYPE && tableColumn.type === TABLE_DATA_TYPE;
export const isTotalSummaryTableRow: IsSpecificRowFn = tableRow => (
  tableRow.type === TABLE_TOTAL_SUMMARY_TYPE
);
export const isGroupSummaryTableRow: IsSpecificRowFn = tableRow => (
  tableRow.type === TABLE_GROUP_SUMMARY_TYPE
);
export const isTreeSummaryTableRow: IsSpecificRowFn = tableRow => (
  tableRow.type === TABLE_TREE_SUMMARY_TYPE
);

export const getColumnSummaries: GetColumnSummariesFn = (
  summaryItems, columnName, summaryValues,
) => summaryItems
  .map((item, index) => [item, index] as [SummaryItem, number])
  .filter(([item]) => item.columnName === columnName)
  .map(([item, index]) => ({
    type: item.type,
    value: summaryValues[index],
  }));
