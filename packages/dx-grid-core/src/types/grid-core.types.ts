import { TableRow, TableColumn } from './table.types';
import { PureReducer, PureComputed } from '@devexpress/dx-core';

/** Defines the column configuration object. Used to display data stored in a row. */
export interface Column {
  /*** Specifies the column name or the name of a row field whose value the column displays.
   * If the column name does not match any field name, specify the `getCellValue` function.
   **/
  name: string;
  /** Specifies the column title. */
  title?: string;
  /** Specifies the function used to get the column value for a given row. */
  getCellValue?: GetCellValueFn;
}

export type Row = any;
export type RowId = number | string;
/** @internal */
export type GetRowIdFn = PureComputed<[Row], RowId>;

/** @internal */
type TogglePayload = { state?: boolean };
/** @internal */
export type ToggleRowsPayload = TogglePayload & { rowIds: RowId[] };
/** @internal */
export type ToggleRowPayload = TogglePayload & { rowId: RowId };
/** @internal */
export type ToggleRowsFieldReducer = PureReducer<RowId[], ToggleRowsPayload>;
/** @internal */
export type ToggleRowFieldReducer = PureReducer<RowId[], ToggleRowPayload>;

export type GetCellValueFn = (row: any, columnName: string) => any;
/** @internal */
export type GetRowLevelKeyFn = PureComputed<[Row?], string>;
/** @internal */
export type GetCollapsedRowsFn = PureComputed<[Row], Row[]>;
/** @internal */
export type IsSpecificRowFn = PureComputed<[Row], boolean | undefined>;
/** @internal */
// tslint:disable-next-line:max-line-length
export type IsSpecificCellFn<P0 = TableRow, P1 = TableColumn, P2 = any> = PureComputed<[P0, P1, P2?], boolean>;

/** @internal */
export type UnwrapRowsComputed = PureComputed<[{ rows: Row[]}], Row[]>;
