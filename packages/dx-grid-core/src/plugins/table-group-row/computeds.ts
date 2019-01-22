import { TABLE_DATA_TYPE } from '../table/constants';
import { TABLE_GROUP_TYPE } from './constants';
import { PureComputed } from '@devexpress/dx-core';
import {
  TableColumn, TableRow, CellColSpanGetter, IsSpecificRowFn,
  TableColumnsWithDraftGroupingFn,
  TableColumnsWithGroupingFn,
} from '../../types';

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

export const tableGroupCellColSpanGetter: CellColSpanGetter = getTableCellColSpan => (params) => {
  const { tableRow, tableColumns, tableColumn } = params;
  if (tableRow.type === TABLE_GROUP_TYPE && tableColumn.type === TABLE_GROUP_TYPE
    && tableRow.row.groupedBy === tableColumn.column!.name) {
    return tableColumns.length - tableColumns.indexOf(tableColumn);
  }
  return getTableCellColSpan(params);
};
