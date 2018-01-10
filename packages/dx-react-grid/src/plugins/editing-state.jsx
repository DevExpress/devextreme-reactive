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
      editingRowIds: props.defaultEditingRowIds || [],
      addedRows: props.defaultAddedRows || [],
      changedRows: props.defaultChangedRows || {},
      deletedRowIds: props.defaultDeletedRowIds || [],
    };

    const stateHelper = createStateHelper(this);

    this.startEditRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingRowIds', startEditRows);
    this.stopEditRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'editingRowIds', stopEditRows);

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
      .bind(stateHelper, 'deletedRowIds', deleteRows);
    this.cancelDeletedRows = stateHelper.applyFieldReducer
      .bind(stateHelper, 'deletedRowIds', cancelDeletedRows);
    this.commitDeletedRows = ({ rowIds }) => {
      this.props.onCommitChanges({ deleted: rowIds });
      this.cancelDeletedRows({ rowIds });
    };
  }
  getState() {
    return {
      ...this.state,
      editingRowIds: this.props.editingRowIds || this.state.editingRowIds,
      changedRows: this.props.changedRows || this.state.changedRows,
      addedRows: this.props.addedRows || this.state.addedRows,
      deletedRowIds: this.props.deletedRowIds || this.state.deletedRowIds,
    };
  }
  notifyStateChange(nextState, state) {
    const { editingRowIds } = nextState;
    const { onEditingRowIdsChange } = this.props;
    if (onEditingRowIdsChange && editingRowIds !== state.editingRowIds) {
      onEditingRowIdsChange(editingRowIds);
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

    const { deletedRowIds } = nextState;
    const { onDeletedRowIdsChange } = this.props;
    if (onDeletedRowIdsChange && deletedRowIds !== state.deletedRowIds) {
      onDeletedRowIdsChange(deletedRowIds);
    }
  }
  render() {
    const { createRowChange, columnExtensions } = this.props;
    const {
      editingRowIds, changedRows, addedRows, deletedRowIds,
    } = this.getState();

    return (
      <PluginContainer
        pluginName="EditingState"
      >
        <Getter
          name="createRowChange"
          value={createRowChangeGetter(createRowChange, columnExtensions)}
        />

        <Getter name="editingRowIds" value={editingRowIds} />
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

        <Getter name="deletedRowIds" value={deletedRowIds} />
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

  editingRowIds: PropTypes.array,
  defaultEditingRowIds: PropTypes.array,
  onEditingRowIdsChange: PropTypes.func,

  addedRows: PropTypes.array,
  defaultAddedRows: PropTypes.array,
  onAddedRowsChange: PropTypes.func,

  changedRows: PropTypes.object,
  defaultChangedRows: PropTypes.object,
  onChangedRowsChange: PropTypes.func,

  deletedRowIds: PropTypes.array,
  defaultDeletedRowIds: PropTypes.array,
  onDeletedRowIdsChange: PropTypes.func,

  onCommitChanges: PropTypes.func.isRequired,
};

EditingState.defaultProps = {
  createRowChange: undefined,
  columnExtensions: undefined,

  editingRowIds: undefined,
  defaultEditingRowIds: [],
  onEditingRowIdsChange: undefined,

  changedRows: undefined,
  defaultChangedRows: {},
  onChangedRowsChange: undefined,

  addedRows: undefined,
  defaultAddedRows: [],
  onAddedRowsChange: undefined,

  deletedRowIds: undefined,
  defaultDeletedRowIds: [],
  onDeletedRowIdsChange: undefined,
};
