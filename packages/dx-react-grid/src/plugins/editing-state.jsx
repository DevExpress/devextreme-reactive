import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  startEditRows,
  stopEditRows,

  addRow,
  changeAddedRow,
  cancelAddedRows,
  addedRowsByIds,

  changeRow,
  cancelChanges,
  changedRowsByIds,
  computedCreateRowChange,

  deleteRows,
  cancelDeletedRows,
} from '@devexpress/dx-grid-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editingRows: props.defaultEditingRows || [],
      addedRows: props.defaultAddedRows || [],
      changedRows: props.defaultChangedRows || {},
      deletedRows: props.defaultDeletedRows || [],
    };

    this.startEditRows = (payload) => {
      this.applyReducer(state => ({
        editingRows: startEditRows(state.editingRows, payload),
      }));
    };
    this.stopEditRows = (payload) => {
      this.applyReducer(state => ({
        editingRows: stopEditRows(state.editingRows, payload),
      }));
    };

    this.changeRow = (payload) => {
      this.applyReducer(state => ({
        changedRows: changeRow(state.changedRows, payload),
      }));
    };
    this.cancelChangedRows = (payload) => {
      this.applyReducer(state => ({
        changedRows: cancelChanges(state.changedRows, payload),
      }));
    };
    this.commitChangedRows = ({ rowIds }) => {
      this.props.onCommitChanges({
        changed: changedRowsByIds(this.getState().changedRows, rowIds),
      });
      this.cancelAddedRows({ rowIds });
    };

    this.addRow = (payload) => {
      this.applyReducer(state => ({
        addedRows: addRow(state.addedRows, payload),
      }));
    };
    this.changeAddedRow = (payload) => {
      this.applyReducer(state => ({
        addedRows: changeAddedRow(state.addedRows, payload),
      }));
    };
    this.cancelAddedRows = (payload) => {
      this.applyReducer(state => ({
        addedRows: cancelAddedRows(state.addedRows, payload),
      }));
    };
    this.commitAddedRows = ({ rowIds }) => {
      this.props.onCommitChanges({
        added: addedRowsByIds(this.getState().addedRows, rowIds),
      });
      this.cancelAddedRows({ rowIds });
    };

    this.deleteRows = (payload) => {
      this.applyReducer(state => ({
        deletedRows: deleteRows(state.deletedRows, payload),
      }));
    };
    this.cancelDeletedRows = (payload) => {
      this.applyReducer(state => ({
        deletedRows: cancelDeletedRows(state.deletedRows, payload),
      }));
    };
    this.commitDeletedRows = ({ rowIds }) => {
      this.props.onCommitChanges({ deleted: rowIds });
      this.cancelDeletedRows({ rowIds });
    };
  }
  getState(temporaryState) {
    return {
      ...this.state,
      editingRows: this.props.editingRows || this.state.editingRows,
      changedRows: this.props.changedRows || this.state.changedRows,
      addedRows: this.props.addedRows || this.state.addedRows,
      deletedRows: this.props.deletedRows || this.state.deletedRows,
      ...(this.state !== temporaryState ? temporaryState : null),
    };
  }
  applyReducer(reduce, payload) {
    const stateUpdater = (prevState) => {
      const state = this.getState(prevState);
      const nextState = { ...state, ...reduce(state, payload) };

      if (stateUpdater === this.lastStateUpdater) {
        this.notifyStateChange(nextState, state);
      }

      return nextState;
    };
    this.lastStateUpdater = stateUpdater;

    this.setState(stateUpdater);
  }
  notifyStateChange(nextState, state) {
    const { editingRows } = nextState;
    const { onEditingRowsChange } = this.props;
    if (onEditingRowsChange && editingRows !== state.editingRows) {
      onEditingRowsChange(editingRows);
    }

    const { changedRows } = nextState;
    const { onChangedRowsChange } = this.props;
    if (onChangedRowsChange && changedRows !== state.addedRows) {
      onChangedRowsChange(changedRows);
    }

    const { addedRows } = nextState;
    const { onAddedRowsChange } = this.props;
    if (onAddedRowsChange && addedRows !== state.addedRows) {
      onAddedRowsChange(addedRows);
    }

    const { deletedRows } = nextState;
    const { onDeletedRowsChange } = this.props;
    if (onDeletedRowsChange && deletedRows !== state.deletedRows) {
      onDeletedRowsChange(deletedRows);
    }
  }
  render() {
    const {
      editingRows, changedRows, addedRows, deletedRows,
    } = this.getState();

    const { createRowChange } = this.props;
    const createRowChangeComputed = ({ columns }) =>
      createRowChange || computedCreateRowChange(columns);

    return (
      <PluginContainer
        pluginName="EditingState"
      >
        <Getter name="createRowChange" computed={createRowChangeComputed} />

        <Getter name="editingRows" value={editingRows} />
        <Action name="startEditRows" action={this.startEditRows} />
        <Action name="stopEditRows" action={this.stopEditRows} />

        <Getter name="changedRows" value={changedRows} />
        <Action name="changeRow" action={this.changeRow} />
        <Action name="cancelChangedRows" action={this.cancelChangedRows} />
        <Action name="commitChangedRows" action={this.commitChangedRows} />

        <Getter name="addedRows" value={addedRows} />
        <Action name="addRow" action={this.addRow} />
        <Action name="changeAddedRow" action={this.changeAddedRow} />
        <Action name="cancelAddedRows" action={this.cancelAddedRows} />
        <Action name="commitAddedRows" action={this.commitAddedRows} />

        <Getter name="deletedRows" value={deletedRows} />
        <Action name="deleteRows" action={this.deleteRows} />
        <Action name="cancelDeletedRows" action={this.cancelDeletedRows} />
        <Action name="commitDeletedRows" action={this.commitDeletedRows} />
      </PluginContainer>
    );
  }
}

EditingState.propTypes = {
  editingRows: PropTypes.array,
  defaultEditingRows: PropTypes.array,
  onEditingRowsChange: PropTypes.func,

  addedRows: PropTypes.array,
  defaultAddedRows: PropTypes.array,
  onAddedRowsChange: PropTypes.func,

  changedRows: PropTypes.object,
  defaultChangedRows: PropTypes.object,
  onChangedRowsChange: PropTypes.func,
  createRowChange: PropTypes.func,

  deletedRows: PropTypes.array,
  defaultDeletedRows: PropTypes.array,
  onDeletedRowsChange: PropTypes.func,

  onCommitChanges: PropTypes.func.isRequired,
};

EditingState.defaultProps = {
  editingRows: undefined,
  defaultEditingRows: [],
  onEditingRowsChange: undefined,

  addedRows: undefined,
  defaultAddedRows: [],
  onAddedRowsChange: undefined,

  deletedRows: undefined,
  defaultDeletedRows: [],
  onDeletedRowsChange: undefined,

  changedRows: undefined,
  defaultChangedRows: {},
  onChangedRowsChange: undefined,

  createRowChange: undefined,
};
