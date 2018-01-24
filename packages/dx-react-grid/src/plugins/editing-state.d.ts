import * as React from 'react';

export interface EditingColumnExtension {
  /** The name of a column to extend. */
  columnName: string;
  /** A function that returns a value specifying row changes depending on the columns' editor values for the current row. This function is called each time the editor's value changes. */
  createRowChange?: (row: any, value: any, columnName: string) => any;
}

export interface ChangeSet {
  /** An array of rows to be created. */
  added?: Array<any>;
  /** An associated array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID. */
  changed?: { [key: string]: any };
  /** An array of IDs representing rows to be deleted. */
  deleted?: Array<number | string>;
}

export interface EditingStateProps {
  /** A function that returns a row change object depending on row editor values. This function is called each time the row editor's value changes. */
  createRowChange: (row: any, columnName: string, value: string | number) => any;
  /** Additional column properties that the plugin can handle. */
  columnExtensions: Array<EditingColumnExtension>;
  /** IDs of the rows being edited. */
  editingRowIds: Array<number | string>;
  /** IDs of the rows initially added to the `editingRowIds` array in uncontrolled mode. */
  defaultEditingRowIds: Array<number | string>;
  /** Handles adding or removing a row to/from the `editingRowIds` array. */
  onEditingRowIdsChange: (editingRowIds: Array<number | string>) => void;
  /** Created but not committed rows. */
  addedRows: Array<any>;
  /** Rows initially added to the `addedRows` array in uncontrolled mode. */
  defaultAddedRows: Array<any>;
  /** Handles adding or removing a row to/from the `addedRows` array. */
  onAddedRowsChange: (addedRows: Array<any>) => void;
  /** Not committed row changes. */
  rowChanges: { [key: string]: any };
  /** Row changes initially added to the `rowChanges` array in uncontrolled mode. */
  defaultRowChanges: { [key: string]: any };
  /** Handles adding or removing a row changes to/from the `rowChanges` array. */
  onRowChangesChange: (rowChanges: { [key: string]: any }) => void;
  /** IDs of the rows prepared for deletion. */
  deletedRowIds: Array<number | string>;
  /** Rows initially added to the `deletedRowIds` array in uncontrolled mode. */
  defaultDeletedRowIds: Array<number | string>;
  /** Handles adding a row to or removing from the `deletedRowIds` array. */
  onDeletedRowIdsChange: (deletedRowIds: Array<number | string>) => void;
  /** Handles row changes committing. */
  onCommitChanges: (changes: Array<ChangeSet>) => void;
}

export declare const EditingState: React.ComponentType<EditingStateProps>;
