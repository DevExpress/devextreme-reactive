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
  startEditCells,
  stopEditCells,
} from '@devexpress/dx-grid-core';
import { EditingStateProps, EditingStateState } from '../types';

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'editingEnabled', defaultValue);

class EditingStateBase extends React.PureComponent<EditingStateProps, EditingStateState> {
  static defaultProps = {
    columnEditingEnabled: true,
    defaultEditingRowIds: [],
    defaultEditingCells: [],
    defaultRowChanges: {},
    defaultAddedRows: [],
    defaultDeletedRowIds: [],
  };
  startEditRows: (payload: any) => void;
  stopEditRows: (payload: any) => void;
  startEditCells: (payload: any) => void;
  stopEditCells: (payload: any) => void;
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
      addedRows,
      rowChanges,
      editingRowIds: props.editingRowIds || props.defaultEditingRowIds,
      deletedRowIds: props.deletedRowIds || props.defaultDeletedRowIds,
      editingCells: props.editingCells || props.defaultEditingCells,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        editingRowIds: () => {
          const { onEditingRowIdsChange } = this.props;
          return onEditingRowIdsChange;
        },
        editingCells: () => {
          const { onEditingCellsChange } = this.props;
          return onEditingCellsChange;
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

    this.startEditCells = stateHelper.applyFieldReducer
    .bind(stateHelper, 'editingCells', startEditCells);
    this.stopEditCells = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingCells', stopEditCells);

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
      editingCells = prevState.editingCells,
      rowChanges = prevState.rowChanges,
      addedRows = prevState.addedRows,
      deletedRowIds = prevState.deletedRowIds,
    } = nextProps;

    return {
      editingRowIds,
      editingCells,
      rowChanges,
      addedRows,
      deletedRowIds,
    };
  }

  render() {
    const { createRowChange, columnExtensions, columnEditingEnabled } = this.props;
    const {
      editingRowIds, editingCells, rowChanges, addedRows, deletedRowIds,
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

        <Getter name="editingCells" value={editingCells} />
        <Action name="startEditCells" action={this.startEditCells} />
        <Action name="stopEditCells" action={this.stopEditCells} />

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

/***
 * A plugin that manages grid rows' editing state. It arranges grid rows
 * by different lists depending on a row's state.
 * */
export const EditingState: React.ComponentType<EditingStateProps> = EditingStateBase;
