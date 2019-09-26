import { PureComputed, PureReducer } from '@devexpress/dx-core';
import { TableColumn } from './table.types';

// tslint:disable-next-line:prefer-array-literal
/** Describes an object that specifies a column width. */
export interface TableColumnWidthInfo {
  /** A column name. */
  columnName: string;
  /** A column width. */
  width: number | string;
}
export interface ResizingSizes {
  /** A new column size. */
  size: number;
  /** A new next column size */
  nextSize?: number;
}
export interface ColumnSizes {
  /** A new column size. */
  width: number;
  /** A new next column size */
  size: number;
}

/* tslint:disable no-namespace max-line-length */
export namespace TableColumnResizing {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** A column name. */
    columnName: string;
    /** A column minimum width. */
    minWidth?: number;
    /** A column maximum width. */
    maxWidth?: number;
  }
}
/* tslint:enable no-namespace max-line-length */

/** @internal */
export type SpecifyWidthsFn = PureComputed<
  [TableColumn[], TableColumnWidthInfo[], string, ErrorFn]
>;
/** @internal */
export type TableColumnsWithWidthFn = PureComputed<
  [TableColumn[], TableColumnWidthInfo[], string]
>;
/** @internal */
export type ErrorFn = PureComputed<
  [], void
>;

/** @internal */
export type ColumnWidthPayload = {
  columnName: string,
  nextColumnName: string,
  resizingMode: string,
  cachedWidths: { [colName: string]: number },
  shift: number,
  minColumnWidth: number,
  maxColumnWidth: number,
  columnExtensions: Array<TableColumnResizing.ColumnExtension>,
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
export type ColumnSizesFn = PureComputed<
  [TableColumnWidthInfo[], ColumnWidthPayload], ResizingSizes
>;
/** @internal */
export type ColumnWidthFn = PureComputed<
  [TableColumnWidthInfo[], string, ColumnWidthPayload], ColumnSizes
>;
/** @internal */
export type ValidValueFn = PureComputed<
  [string, string[]],
  boolean
>;

/** @internal */
export type ConvertWidthFn = PureComputed<
  [number | string], number | string
>;
