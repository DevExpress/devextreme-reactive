import { EditingCell } from '../index';

// tslint:disable-next-line:no-namespace
export namespace EditingState {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether editing is enabled for a column. */
    editingEnabled?: boolean;
    // tslint:disable-next-line:max-line-length
    /** A function that returns a value specifying row changes depending on the columns' editor values for the current row. This function is called each time the editor's value changes. */
    createRowChange?: (row: any, value: any, columnName: string) => any;
  }
}
/** Describes uncommitted changes made to the grid data. */
export interface ChangeSet {
  /** An array of rows to be created. */
  added?: ReadonlyArray<any>;
  // tslint:disable-next-line:max-line-length
  /** An associative array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID. */
  changed?: { [key: string]: any };
  /** An array of IDs representing rows to be deleted. */
  deleted?: ReadonlyArray<number | string>;
}
export interface EditingStateProps {
  // tslint:disable-next-line:max-line-length
  /** A function that returns a row change object depending on row editor values. This function is called each time the row editor's value changes. */
  createRowChange?: (row: any, value: string | number, columnName: string) => any;
  /** Specifies whether editing is enabled for all columns. */
  columnEditingEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<EditingState.ColumnExtension>;
  /** IDs of the rows being edited. */
  editingRowIds?: Array<number | string>;
  /** IDs of the rows initially added to the `editingRowIds` array in uncontrolled mode. */
  defaultEditingRowIds?: Array<number | string>;
  /** Row ID and column name of cells that are being edited. */
  editingCells?: Array<EditingCell>;
  // tslint:disable-next-line:max-line-length
  /** Row ID and column name of cells initially added to the `editingCells` array in uncontrolled mode. */
  defaultEditingCells?: Array<EditingCell>;
  /** Handles adding or removing a row to/from the `editingRowIds` array. */
  onEditingRowIdsChange?: (editingRowIds: Array<number | string>) => void;
  /** Handles changing a cell to/from the `editingRowIds` array. */
  onEditingCellsChange?: (editingRowIds: Array<EditingCell>) => void;
  /** @internal */
  deletedRowIds?: Array<number | string>;
  /** @internal */
  defaultDeletedRowIds?: Array<number | string>;
  onDeletedRowIdsChange?: (deletedRowIds: Array<number | string>) => void;
  /** Created but not committed rows. */
  addedRows?: Array<any>;
  /** Rows initially added to the `addedRows` array in uncontrolled mode. */
  defaultAddedRows?: Array<any>;
  /** Handles adding or removing a row to/from the `addedRows` array. */
  onAddedRowsChange?: (addedRows: Array<any>) => void;
  /** Not committed row changes. */
  rowChanges?: { [key: string]: any };
  /** Row changes initially added to the `rowChanges` array in uncontrolled mode. */
  defaultRowChanges?: { [key: string]: any };
  /** Handles adding or removing a row changes to/from the `rowChanges` array. */
  onRowChangesChange?: (rowChanges: { [key: string]: any }) => void;
  /** Handles row changes committing. */
  onCommitChanges: (changes: ChangeSet) => void;
}

/** @internal */
export type EditingStateState = {
  editingRowIds: Array<number | string>;
  editingCells: Array<EditingCell>;
  addedRows: Array<any>;
  rowChanges: { [key: string]: any };
  deletedRowIds: Array<number | string>;
};
