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
export interface ColumnExtension {
  /** A column name. */
  columnName: string;
  /** A column min width. */
  minWidth: number;
  /** A column max width. */
  maxWidth: number;
}
/** @internal */
export type SpecifyWidthsFn = PureComputed<
  [TableColumn[], TableColumnWidthInfo[], (columnName: string) => void]
>;
/** @internal */
export type TableColumnsWithWidthFn = PureComputed<[TableColumn[], TableColumnWidthInfo[]]>;

/** @internal */
export type ColumnWidthPayload = {
  columnName: string,
  shift: number,
  minColumnWidth: number,
  maxColumnWidth: number,
  columnExtensions: Array<ColumnExtension>,
};
/** @internal */
export type ColumnWidthState = {
  columnWidths: TableColumnWidthInfo[],
  draftColumnWidths: TableColumnWidthInfo[],
};
/** @internal */
export type ColumnWidthReducer = PureReducer<
  ColumnWidthState, ColumnWidthPayload, Partial<ColumnWidthState>
>;
/** @internal */
export type ColumnSizeFn = PureComputed<
  [TableColumn | TableColumnWidthInfo, ColumnWidthPayload],
  number
>;
