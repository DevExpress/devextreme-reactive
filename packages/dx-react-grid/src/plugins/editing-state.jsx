import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
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

export class EditingState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingRowIds: props.editingRowIds || props.defaultEditingRowIds,
      addedRows: props.addedRows || props.defaultAddedRows,
      rowChanges: props.rowChanges || props.defaultRowChanges,
      deletedRowIds: props.deletedRowIds || props.defaultDeletedRowIds,
    };

    const stateHelper = createStateHelper(
      this,
      {
        editingRowIds: () => this.props.onEditingRowIdsChange,
        addedRows: () => this.props.onAddedRowsChange,
        rowChanges: () => this.props.onRowChangesChange,
        deletedRowIds: () => this.props.onDeletedRowIdsChange,
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
      this.props.onCommitChanges({
        changed: changedRowsByIds(this.state.rowChanges, rowIds),
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
        added: addedRowsByIds(this.state.addedRows, rowIds),
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
  componentWillReceiveProps(nextProps) {
    const {
      editingRowIds,
      rowChanges,
      addedRows,
      deletedRowIds,
    } = nextProps;
    this.setState({
      ...editingRowIds !== undefined ? { editingRowIds } : null,
      ...rowChanges !== undefined ? { rowChanges } : null,
      ...addedRows !== undefined ? { addedRows } : null,
      ...deletedRowIds !== undefined ? { deletedRowIds } : null,
    });
  }
  render() {
    const { createRowChange, columnExtensions } = this.props;
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
      </Plugin>
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

  rowChanges: PropTypes.object,
  defaultRowChanges: PropTypes.object,
  onRowChangesChange: PropTypes.func,

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

  rowChanges: undefined,
  defaultRowChanges: {},
  onRowChangesChange: undefined,

  addedRows: undefined,
  defaultAddedRows: [],
  onAddedRowsChange: undefined,

  deletedRowIds: undefined,
  defaultDeletedRowIds: [],
  onDeletedRowIdsChange: undefined,
};
