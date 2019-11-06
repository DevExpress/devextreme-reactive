import { PureComputed } from '@devexpress/dx-core';
import {
  TABLE_TOTAL_SUMMARY_TYPE, TABLE_GROUP_SUMMARY_TYPE, TABLE_TREE_SUMMARY_TYPE,
} from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  GetColumnSummariesFn, IsSpecificCellFn, IsSpecificRowFn, SummaryItem,
  GetGroupInlineSummariesFn, ColumnInlineSummaries, GroupSummaryItem,
} from '../../types';

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
  summaryItems, columnName, summaryValues, predicate = () => true,
) => summaryItems
  .map((item, index) => [item, index] as [SummaryItem, number])
  .filter(([item]) => item.columnName === columnName && predicate(item))
  .map(([item, index]) => ({
    type: item.type,
    value: summaryValues[index],
  }));

export const isInlineGroupSummary: PureComputed<[SummaryItem], boolean> = summaryItem => (
  (summaryItem as GroupSummaryItem).showInGroupCaption ||
  (summaryItem as GroupSummaryItem).showInGroupRow
);
export const isInlineGroupCaptionSummary: PureComputed<[SummaryItem], boolean> = summaryItem => (
  (summaryItem as GroupSummaryItem).showInGroupCaption
);

export const getGroupInlineSummaries: GetGroupInlineSummariesFn = (
  summaryItems, columns, summaryValues,
) => {
  if (!summaryItems.some(isInlineGroupCaptionSummary)) {
    return [];
  }

  return columns.reduce((acc, column) => {
    const colName = column.name;
    const summaries = getColumnSummaries(
      summaryItems, colName, summaryValues, isInlineGroupCaptionSummary,
    );
    if (summaries.length) {
      acc.push({
        column,
        summaries,
      });
    }

    return acc;
  }, [] as ColumnInlineSummaries[]);
};
