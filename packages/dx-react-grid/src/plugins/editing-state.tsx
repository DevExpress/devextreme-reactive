import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper,
} from '@devexpress/dx-react-core';
import {
  createRowChangeGetter,
  startEditRows,
  stopEditRows,
  addRow,
  changeAddedRow,
  cancelAddedRows,
  addedRowsByIds,
  changeRow,
  cancelChanges,
  changedRowsByIds,
  deleteRows,
  cancelDeletedRows,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';

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
  /** Handles adding or removing a row to/from the `editingRowIds` array. */
  onEditingRowIdsChange?: (editingRowIds: Array<number | string>) => void;
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
interface EditingStateState {
  editingRowIds: Array<number | string>;
  addedRows: Array<any>;
  rowChanges: { [key: string]: any };
  deletedRowIds: Array<number | string>;
}

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'editingEnabled', defaultValue);

export class EditingState extends React.PureComponent<EditingStateProps, EditingStateState> {
  startEditRows: (payload: any) => void;
  stopEditRows: (payload: any) => void;
  changeRow: (payload: any) => void;
  cancelChangedRows: (payload: any) => void;
  commitChangedRows: ({ rowIds }: { rowIds: any; }) => void;
  addRow: (payload: any) => void;
  changeAddedRow: (payload: any) => void;
  cancelAddedRows: (payload: any) => void;
  commitAddedRows: ({ rowIds }: { rowIds: any; }) => void;
  deleteRows: (payload: any) => void;
  cancelDeletedRows: (payload: any) => void;
  commitDeletedRows: ({ rowIds }: { rowIds: any; }) => void;

  constructor(props) {
    super(props);
    const rowChanges = props.rowChanges || props.defaultRowChanges;
    const addedRows = props.addedRows || props.defaultAddedRows;
    const getRowChanges = () => {
      const { rowChanges: stateRowChanges } = this.state;
      return stateRowChanges;
    };
    const getAddedRows = () => {
      const { addedRows: stateAddedRows } = this.state;
      return stateAddedRows;
    };

    this.state = {
      editingRowIds: props.editingRowIds || props.defaultEditingRowIds,
      addedRows,
      rowChanges,
      deletedRowIds: props.deletedRowIds || props.defaultDeletedRowIds,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        editingRowIds: () => {
          const { onEditingRowIdsChange } = this.props;
          return onEditingRowIdsChange;
        },
        addedRows: () => {
          const { onAddedRowsChange } = this.props;
          return onAddedRowsChange;
        },
        rowChanges: () => {
          const { onRowChangesChange } = this.props;
          return onRowChangesChange;
        },
        deletedRowIds: () => {
          const { onDeletedRowIdsChange } = this.props;
          return onDeletedRowIdsChange;
        },
      },
    );

    this.startEditRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingRowIds', startEditRows);
    this.stopEditRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingRowIds', stopEditRows);

    this.changeRow = stateHelper.applyFieldReducer
      .bind(stateHelper, 'rowChanges', changeRow);
    this.cancelChangedRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'rowChanges', cancelChanges);
    this.commitChangedRows = ({ rowIds }) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({
        changed: changedRowsByIds(getRowChanges(), rowIds),
      });
      this.cancelChangedRows({ rowIds });
    };

    this.addRow = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedRows', addRow);
    this.changeAddedRow = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedRows', changeAddedRow);
    this.cancelAddedRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedRows', cancelAddedRows);
    this.commitAddedRows = ({ rowIds }) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({
        added: addedRowsByIds(getAddedRows(), rowIds),
      });
      this.cancelAddedRows({ rowIds });
    };

    this.deleteRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedRowIds', deleteRows);
    this.cancelDeletedRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedRowIds', cancelDeletedRows);
    this.commitDeletedRows = ({ rowIds }) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: rowIds });
      this.cancelDeletedRows({ rowIds });
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      editingRowIds = prevState.editingRowIds,
      rowChanges = prevState.rowChanges,
      addedRows = prevState.addedRows,
      deletedRowIds = prevState.deletedRowIds,
    } = nextProps;

    return {
      editingRowIds,
      rowChanges,
      addedRows,
      deletedRowIds,
    };
  }

  render() {
    const { createRowChange, columnExtensions, columnEditingEnabled } = this.props;
    const {
      editingRowIds, rowChanges, addedRows, deletedRowIds,
    } = this.state;

    return (
      <Plugin
        name="EditingState"
      >
        <Getter
          name="createRowChange"
          value={createRowChangeGetter(createRowChange, columnExtensions)}
        />

        <Getter name="editingRowIds" value={editingRowIds} />
        <Action name="startEditRows" action={this.startEditRows} />
        <Action name="stopEditRows" action={this.stopEditRows} />

        <Getter name="rowChanges" value={rowChanges} />
        <Action name="changeRow" action={this.changeRow} />
        <Action name="cancelChangedRows" action={this.cancelChangedRows} />
        <Action name="commitChangedRows" action={this.commitChangedRows} />

        <Getter name="addedRows" value={addedRows} />
        <Action name="addRow" action={this.addRow} />
        <Action name="changeAddedRow" action={this.changeAddedRow} />
        <Action name="cancelAddedRows" action={this.cancelAddedRows} />
        <Action name="commitAddedRows" action={this.commitAddedRows} />

        <Getter name="deletedRowIds" value={deletedRowIds} />
        <Action name="deleteRows" action={this.deleteRows} />
        <Action name="cancelDeletedRows" action={this.cancelDeletedRows} />
        <Action name="commitDeletedRows" action={this.commitDeletedRows} />

        <Getter
          name="isColumnEditingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnEditingEnabled)}
        />
      </Plugin>
    );
  }
}
