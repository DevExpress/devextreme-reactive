import { PureComputed } from '@devexpress/dx-core';
import { TABLE_GROUP_TYPE } from './constants';
import { TableRow, TableColumn, IsSpecificCellFn, Grouping } from '../../types';

const getGroupIndexByColumn: PureComputed<[Grouping[], TableColumn], number> = (
  grouping, tableColumn,
) => grouping.findIndex(
  columnGrouping => !!tableColumn.column && columnGrouping.columnName === tableColumn.column.name,
);

export const isGroupTableCell: IsSpecificCellFn = (
  tableRow, tableColumn,
) => !!(tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
  && tableColumn.column
  && tableColumn.column.name === tableRow.row.groupedBy);

export const isGroupIndentTableCell: PureComputed<[TableRow, TableColumn, Grouping[]], boolean> = (
  tableRow, tableColumn, grouping,
) => {
  if (tableRow.type !== TABLE_GROUP_TYPE || tableColumn.type !== TABLE_GROUP_TYPE) return false;
  if (tableColumn.column && tableRow.row.groupedBy === tableColumn.column.name) return false;
  const rowGroupIndex = grouping.findIndex(
    columnGrouping => columnGrouping.columnName === tableRow.row.groupedBy,
  );
  const columnGroupIndex = getGroupIndexByColumn(grouping, tableColumn);

  return columnGroupIndex < rowGroupIndex;
};
export const isGroupTableRow = (tableRow: TableRow) => tableRow.type === TABLE_GROUP_TYPE;

export const calculateGroupCellLeft: PureComputed<[TableColumn, Grouping[], number], number> = (
  tableColumn, grouping, indentWidth,
) => (
  indentWidth * getGroupIndexByColumn(grouping, tableColumn)
);
