import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from './constants';
import { PureComputed } from '@devexpress/dx-core';
import {
  TableColumn, TableRow, IsSpecificRowFn,
  TableColumnsWithDraftGroupingFn,
  TableColumnsWithGroupingFn,
  GroupCellColSpanGetter,
  GroupSummaryChainsFn,
  SummaryItem,
} from '../../types';
import { sortAndSpliceColumns } from './helpers';

const tableColumnsWithDraftGrouping: TableColumnsWithDraftGroupingFn = (
  tableColumns, grouping, draftGrouping, showColumnWhenGrouped,
) => tableColumns
  .reduce((acc, tableColumn) => {
    if (tableColumn.type !== TABLE_DATA_TYPE) {
      acc.push(tableColumn);
      return acc;
    }

    const columnName = tableColumn.column && tableColumn.column.name || '';
    const columnGroupingExists = grouping
      .some(columnGrouping => columnGrouping.columnName === columnName);
    const columnDraftGroupingExists = draftGrouping
      .some(columnGrouping => columnGrouping.columnName === columnName);

    if ((!columnGroupingExists && !columnDraftGroupingExists)
        || showColumnWhenGrouped(columnName)) {
      acc.push(tableColumn);
    } else if ((!columnGroupingExists && columnDraftGroupingExists)
        || (columnGroupingExists && !columnDraftGroupingExists)) {
      acc.push({
        ...tableColumn,
        draft: true,
      });
    }
    return acc;
  // tslint:disable-next-line: prefer-array-literal
  }, [] as Array<TableColumn & { draft?: boolean }>);

export const tableColumnsWithGrouping: TableColumnsWithGroupingFn = (
  columns, tableColumns, grouping, draftGrouping, indentColumnWidth, showColumnWhenGrouped,
) => [
  ...grouping.map((columnGrouping) => {
    const groupedColumn = columns.find(column => column.name === columnGrouping.columnName);
    return {
      key: `${TABLE_GROUP_TYPE.toString()}_${groupedColumn!.name}`,
      type: TABLE_GROUP_TYPE,
      column: groupedColumn,
      width: indentColumnWidth,
    };
  }),
  ...tableColumnsWithDraftGrouping(tableColumns, grouping, draftGrouping, showColumnWhenGrouped),
];

export const tableRowsWithGrouping: PureComputed<[TableRow[], IsSpecificRowFn]> = (
  tableRows, isGroupRow,
) => tableRows.map((tableRow) => {
  if (tableRow.type !== TABLE_DATA_TYPE || !isGroupRow(tableRow.row)) {
    return tableRow;
  }
  return {
    ...tableRow,
    key: `${TABLE_GROUP_TYPE.toString()}_${tableRow.row.compoundKey}`,
    type: TABLE_GROUP_TYPE,
  };
});

const isRowLevelSummary: PureComputed<[SummaryItem[], string], boolean> = (
  groupSummaryItems, colName,
) => (
  groupSummaryItems.some((item: any) => (
    !item.showInGroupFooter && item.alignByColumn && item.columnName === colName),
  )
);

const groupSummaryChains: GroupSummaryChainsFn = (
  tableRow,
  tableColumns,
  groupSummaryItems,
  firstVisibleColumnIndex,
) => {
  let captionStarted = false;
  return sortAndSpliceColumns(tableColumns, firstVisibleColumnIndex)
    .reduce((acc, col) => {
      const colName = (col.column && col.column.name) as string;
      const colKey = col.key;
      const isStartOfGroupCaption = col.type === TABLE_GROUP_TYPE
        && tableRow.row.groupedBy === colName;
      const isIndentColumn = col.type === TABLE_GROUP_TYPE
        && tableRow.row.groupedBy !== colName && !captionStarted;

      if (isStartOfGroupCaption) {
        captionStarted = true;
      }

      if (isStartOfGroupCaption || isIndentColumn) {
        acc.push([colKey]);
      } else if (groupSummaryItems && isRowLevelSummary(groupSummaryItems, colName)) {
        acc.push([colKey]);
        acc.push([]);
      } else {
        acc[acc.length - 1].push(colKey);
      }
      return acc;
    }, [[]] as string[][]);
};

export const tableGroupCellColSpanGetter: GroupCellColSpanGetter = (
  getTableCellColSpan, groupSummaryItems, firstVisibleColumnIndex,
) => (params) => {
  const { tableRow, tableColumns, tableColumn } = params;

  if (tableRow.type === TABLE_GROUP_TYPE) {
    const colKey = tableColumn.key;
    const chains = groupSummaryChains(
      tableRow, tableColumns, groupSummaryItems, firstVisibleColumnIndex,
    );
    const chain = chains.find(ch => ch[0] === colKey);

    if (chain) {
      return chain.length;
    }
  }
  return getTableCellColSpan(params);
};
