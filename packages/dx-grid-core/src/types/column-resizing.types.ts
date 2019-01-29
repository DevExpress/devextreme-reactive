import { PureComputed, PureReducer } from '@devexpress/dx-core';
import { TableColumn } from './table.types';

// tslint:disable-next-line:prefer-array-literal
/** Describes an object that specifies a column width. */
export interface TableColumnWidthInfo {
  /** A column name. */
  columnName: string;
  /** A column width. */
  width: number;
}
export type SpecifyWidthsFn = PureComputed<
  [TableColumn[], TableColumnWidthInfo[], (columnName: string) => void]
>;
export type TableColumnsWithWidthFn = PureComputed<[TableColumn[], TableColumnWidthInfo[]]>;

export type ColumnWidthPayload = { columnName: string, shift: number, minColumnWidth: number };
export type ColumnWidthState = {
  columnWidths: TableColumnWidthInfo[],
  draftColumnWidths: TableColumnWidthInfo[],
};
export type ColumnWidthReducer = PureReducer<
  ColumnWidthState, ColumnWidthPayload, Partial<ColumnWidthState>
>;
