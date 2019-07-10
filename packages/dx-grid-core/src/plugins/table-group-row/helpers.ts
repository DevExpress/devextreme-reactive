import { PureComputed } from '@devexpress/dx-core';
import { TABLE_GROUP_TYPE, TABLE_STUB_TYPE } from './constants';
import { TableRow, TableColumn, IsSpecificCellFn, Grouping } from '../../types';

type GroupCellType = PureComputed<[TableRow, TableColumn, Grouping[]], boolean>;

const getGroupIndexByColumn: PureComputed<[Grouping[], TableColumn], number> = (
  grouping, tableColumn,
) => grouping.findIndex(
  columnGrouping => !!tableColumn.column && columnGrouping.columnName === tableColumn.column.name,
);

export const isPlacedLeftOfGroupRow: GroupCellType = (
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

export const isGroupIndentTableCell: GroupCellType = (
  tableRow, tableColumn, grouping,
) => {
  if (tableRow.type !== TABLE_GROUP_TYPE || tableColumn.type !== TABLE_GROUP_TYPE) return false;
  return isPlacedLeftOfGroupRow(tableRow, tableColumn, grouping);
};

export const isGroupIndentStubTableCell: GroupCellType = (
  tableRow, tableColumn, grouping,
) => {
  if (tableRow.type !== TABLE_GROUP_TYPE || tableColumn.type !== TABLE_STUB_TYPE) return false;
  return isPlacedLeftOfGroupRow(tableRow, tableColumn, grouping);
};

export const isGroupTableRow = (tableRow: TableRow) => tableRow.type === TABLE_GROUP_TYPE;

export const calculateGroupCellIndent: PureComputed<[TableColumn, Grouping[], number], number> = (
  tableColumn, grouping, indentWidth,
) => (
  indentWidth * getGroupIndexByColumn(grouping, tableColumn)
);
