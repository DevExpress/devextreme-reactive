import { PureComputed, PureReducer } from '@devexpress/dx-core';
import { TableColumn } from './table.types';

// tslint:disable-next-line:prefer-array-literal
type ColumnWidth = { columnName: string, width: number };
export type SpecifyWidthsFn = PureComputed<
  [TableColumn[], ColumnWidth[], (columnName: string) => void]
>;
export type TableColumnsWithWidthFn = PureComputed<[TableColumn[], ColumnWidth[]]>;

export type ColumnWidthPayload = { columnName: string, shift: number, minColumnWidth: number };
export type ColumnWidthState = {
  columnWidths: ColumnWidth[],
  draftColumnWidths: ColumnWidth[],
};
export type ColumnWidthReducer = PureReducer<
  ColumnWidthState, ColumnWidthPayload, Partial<ColumnWidthState>
>;
