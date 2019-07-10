import { PureComputed } from '@devexpress/dx-core';
import { TABLE_GROUP_TYPE } from './constants';
import { TableRow, TableColumn, IsSpecificCellFn, Grouping } from '../../types';
import { TABLE_STUB_TYPE } from '../../utils/virtual-table';

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

export const calculateGroupCellIndent: PureComputed<[TableColumn, Grouping[], number], number> = (
  tableColumn, grouping, indentWidth,
) => (
  indentWidth * getGroupIndexByColumn(grouping, tableColumn)
);
