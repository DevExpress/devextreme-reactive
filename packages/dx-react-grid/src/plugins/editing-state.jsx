import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
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
} from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editingRows: props.defaultEditingRows || [],
      addedRows: props.defaultAddedRows || [],
      changedRows: props.defaultChangedRows || {},
      deletedRows: props.defaultDeletedRows || [],
    };

    const stateHelper = createStateHelper(this);

    this.startEditRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingRows', startEditRows);
    this.stopEditRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingRows', stopEditRows);

    this.changeRow = stateHelper.applyFieldReducer
      .bind(stateHelper, 'changedRows', changeRow);
    this.cancelChangedRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'changedRows', cancelChanges);
    this.commitChangedRows = ({ rowIds }) => {
      this.props.onCommitChanges({
        changed: changedRowsByIds(this.getState().changedRows, rowIds),
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
      this.props.onCommitChanges({
        added: addedRowsByIds(this.getState().addedRows, rowIds),
      });
      this.cancelAddedRows({ rowIds });
    };

    this.deleteRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedRows', deleteRows);
    this.cancelDeletedRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedRows', cancelDeletedRows);
    this.commitDeletedRows = ({ rowIds }) => {
      this.props.onCommitChanges({ deleted: rowIds });
      this.cancelDeletedRows({ rowIds });
    };
  }
  getState() {
    return {
      ...this.state,
      editingRows: this.props.editingRows || this.state.editingRows,
      changedRows: this.props.changedRows || this.state.changedRows,
      addedRows: this.props.addedRows || this.state.addedRows,
      deletedRows: this.props.deletedRows || this.state.deletedRows,
    };
  }
  notifyStateChange(nextState, state) {
    const { editingRows } = nextState;
    const { onEditingRowsChange } = this.props;
    if (onEditingRowsChange && editingRows !== state.editingRows) {
      onEditingRowsChange(editingRows);
    }

    const { changedRows } = nextState;
    const { onChangedRowsChange } = this.props;
    if (onChangedRowsChange && changedRows !== state.changedRows) {
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
    const { createRowChange, columnExtensions } = this.props;
    const {
      editingRows, changedRows, addedRows, deletedRows,
    } = this.getState();

    return (
      <PluginContainer
        pluginName="EditingState"
      >
        <Getter
          name="createRowChange"
          value={createRowChangeGetter(createRowChange, columnExtensions)}
        />

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
  createRowChange: PropTypes.func,
  columnExtensions: PropTypes.array,

  editingRows: PropTypes.array,
  defaultEditingRows: PropTypes.array,
  onEditingRowsChange: PropTypes.func,

  addedRows: PropTypes.array,
  defaultAddedRows: PropTypes.array,
  onAddedRowsChange: PropTypes.func,

  changedRows: PropTypes.object,
  defaultChangedRows: PropTypes.object,
  onChangedRowsChange: PropTypes.func,

  deletedRows: PropTypes.array,
  defaultDeletedRows: PropTypes.array,
  onDeletedRowsChange: PropTypes.func,

  onCommitChanges: PropTypes.func.isRequired,
};

EditingState.defaultProps = {
  createRowChange: undefined,
  columnExtensions: undefined,

  editingRows: undefined,
  defaultEditingRows: [],
  onEditingRowsChange: undefined,

  changedRows: undefined,
  defaultChangedRows: {},
  onChangedRowsChange: undefined,

  addedRows: undefined,
  defaultAddedRows: [],
  onAddedRowsChange: undefined,

  deletedRows: undefined,
  defaultDeletedRows: [],
  onDeletedRowsChange: undefined,
};
