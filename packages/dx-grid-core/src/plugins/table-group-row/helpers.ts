import { PureComputed } from '@devexpress/dx-core';
import { TABLE_GROUP_TYPE } from './constants';
import { TableRow, TableColumn, IsSpecificCellFn, Grouping, GroupSummaryItem } from '../../types';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';
import { TABLE_DATA_TYPE } from '../table/constants';

type IsGroupIndentCellFn = PureComputed<[TableRow, TableColumn, Grouping[]], boolean>;

const getGroupIndexByColumn: PureComputed<[Grouping[], TableColumn], number> = (
  grouping, tableColumn,
) => grouping.findIndex(
  columnGrouping => !!tableColumn.column && columnGrouping.columnName === tableColumn.column.name,
);

const isIndentCell: IsGroupIndentCellFn = (
    tableRow,
    tableColumn,
    grouping,
  ) => {
  if (tableColumn.column && tableRow.row.groupedBy === tableColumn.column.name) return false;
  const rowGroupIndex = grouping.findIndex(
    columnGrouping => columnGrouping.columnName === tableRow.row.groupedBy,
  );
  const columnGroupIndex = getGroupIndexByColumn(grouping, tableColumn);

  return columnGroupIndex < rowGroupIndex;
};

export const isGroupTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => !!(tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && tableColumn.column
  && tableColumn.column.name === tableRow.row.groupedBy);

export const isGroupIndentTableCell: IsGroupIndentCellFn = (
  tableRow, tableColumn, grouping,
) => (
  tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE &&
  isIndentCell(tableRow, tableColumn, grouping)
);

export const isGroupIndentStubTableCell: IsGroupIndentCellFn = (
  tableRow, tableColumn, grouping,
) => (
  (tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_STUB_TYPE &&
    isIndentCell(tableRow, tableColumn, grouping))
);

export const isGroupTableRow = (tableRow: TableRow) => tableRow.type === TABLE_GROUP_TYPE;

export const isGroupRowOrdinaryCell: IsSpecificCellFn = (tableRow, tableColumn) => (
  isGroupTableRow(tableRow) && !isGroupTableCell(tableRow, tableColumn)
);

const columnHasGroupRowSummary: PureComputed<[TableColumn, GroupSummaryItem[]], boolean> = (
  tableColumn, groupSummaryItems,
) => (
  !!(groupSummaryItems && groupSummaryItems
    .some(item => (
      (!item.showInGroupFooter && item.alignByColumn)
        && item.columnName === (tableColumn.column && tableColumn.column.name)
    )))
);

export const isRowSummaryCell: PureComputed<
  [TableRow, TableColumn, Grouping[], GroupSummaryItem[]], boolean
> = (
  tableRow, tableColumn, grouping, groupSummaryItems,
) => (
  columnHasGroupRowSummary(tableColumn, groupSummaryItems)
  && !isGroupIndentTableCell(tableRow, tableColumn, grouping)
);

export const isPreviousCellContainSummary: PureComputed<
  [TableRow, TableColumn, TableColumn[], Grouping[], GroupSummaryItem[]], boolean
> = (
  tableRow, tableColumn, tableColumns, grouping, groupSummaryItems,
) => {
  const columnIndex = tableColumns.indexOf(tableColumn);
  return columnIndex > 0 && isRowSummaryCell(
    tableRow, tableColumns[columnIndex - 1], grouping, groupSummaryItems,
  );
};

export const calculateGroupCellIndent: PureComputed<[TableColumn, Grouping[], number], number> = (
  tableColumn, grouping, indentWidth,
) => (
  indentWidth * getGroupIndexByColumn(grouping, tableColumn)
);

export const sortAndSpliceColumns: PureComputed<[TableColumn[], number]> = (
  tableColumns, firstVisibleColumnIndex,
) => {
  const groupColumns = tableColumns.filter(col => col.type === TABLE_GROUP_TYPE);
  const dataColumns = tableColumns.filter(col => col.type === TABLE_DATA_TYPE);
  const otherColumns = tableColumns.filter(
    col => col.type !== TABLE_DATA_TYPE && col.type !== TABLE_GROUP_TYPE,
  );

  if (firstVisibleColumnIndex) {
    const firstGroupIndex = tableColumns.indexOf(groupColumns[0]);
    otherColumns.splice(0, Math.min(firstVisibleColumnIndex, firstGroupIndex));
  }

  return [...groupColumns, ...otherColumns, ...dataColumns];
};
