/** Defines the column configuration object. Used to display data stored in a row. */
import { TableRow, TableColumn } from './table.types';
import { PureReducer, PureComputed, CustomFunction } from '@devexpress/dx-core';

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
export type GetRowIdFn = PureComputed<[Row], RowId>;

type TogglePayload = { state?: boolean };
export type ToggleRowsPayload = TogglePayload & { rowIds: RowId[] };
export type ToggleRowPayload = TogglePayload & { rowId: RowId };
export type ToggleRowsFieldReducer = PureReducer<RowId[], ToggleRowsPayload>;
export type ToggleRowFieldReducer = PureReducer<RowId[], ToggleRowPayload>;

/** Specifies the function used to get a cell's value. */
export type GetCellValueFn = CustomFunction<[Row, string], any>;
export type GetRowLevelKeyFn = PureComputed<[Row?], string>;
export type GetCollapsedRowsFn = PureComputed<[Row], Row[]>;
export type IsSpecificRowFn = PureComputed<[Row], boolean | undefined>;
// tslint:disable-next-line:max-line-length
export type IsSpecificCellFn<P0 = TableRow, P1 = TableColumn, P2 = any> = PureComputed<[P0, P1, P2?], boolean>;

export type UnwrapRowsComputed = PureComputed<[{ rows: Row[]}], Row[]>;
