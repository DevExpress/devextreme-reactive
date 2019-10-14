import { Row, RowId } from './grid-core.types';
import { CustomFunction, PureComputed } from '@devexpress/dx-core';
import { TableRow } from './table.types';

export interface EditingColumnExtension {
  /** The name of a column to extend. */
  columnName: string;
  /** Specifies whether editing is enabled for a column. */
  editingEnabled?: boolean;
  /**
   * A function that returns a value specifying row changes depending on the columns' editor
   * values for the current row. This function is called each time the editor's value changes.
   */
  createRowChange?: (row: any, value: any, columnName: string) => any;
}

/** @internal */
export type CreateRowChangeFn = CustomFunction<[Row, any, string], any>;

/** @internal */
export type RowIdsPayload = { rowIds: RowId[]; };
/** @internal */
export type EditingCellsPayload = { editingCells: EditingCell[]; };
/** @internal */
export type RowPayload = { row: Row };
/** @internal */
export type RowChangePayload = { rowId: RowId, change: any };
/** @internal */
export type RowChanges = { [key: string]: any };

/** @internal */
export type TableRowsWithEditingFn = PureComputed<
  [TableRow[], RowId[], TableRow[], number?]
>;

export interface EditingCell {
  rowId: number | string;
  columnName: string;
}
