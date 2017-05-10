import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  startEditRows,
  stopEditRows,

  addRow,
  changeAddedRow,
  cancelAddedRows,
  newRowsByIds,

  changeRow,
  cancelChanges,
  changedRowsByIds,

  deleteRows,
  cancelDeletedRows,
} from '@devexpress/dx-datagrid-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editingRows: props.defaultEditingRows || [],
      newRows: props.defaultAddedRows || [],
      changedRows: props.defaultChangedRows || {},
      deletedRows: props.defaultDeletedRows || [],
    };

    this._reduceEditingRows = reducer => (editingRows, payload) => {
      const { onEditingRowsChange } = this.props;
      const nextEditingRows = reducer(editingRows, payload);
      this.setState({ editingRows: nextEditingRows });
      if (onEditingRowsChange) {
        onEditingRowsChange(nextEditingRows);
      }
    };
    this._reduceChangedRows = reducer => (changedRows, payload) => {
      const { onChangedRowsChange } = this.props;
      const nextChangedRows = reducer(changedRows, payload);
      this.setState({ changedRows: nextChangedRows });
      if (onChangedRowsChange) {
        onChangedRowsChange(nextChangedRows);
      }
    };
    this._reduceAddedRows = reducer => (newRows, payload) => {
      const { onAddedRowsChange } = this.props;
      const nextAddedRows = reducer(newRows, payload);
      this.setState({ newRows: nextAddedRows });
      if (onAddedRowsChange) {
        onAddedRowsChange(nextAddedRows);
      }
    };
    this._reduceDeletedRows = reducer => (deletedRows, payload) => {
      const { onDeletedRowsChange } = this.props;
      const nextDeletedRows = reducer(deletedRows, payload);
      this.setState({ deletedRows: nextDeletedRows });
      if (onDeletedRowsChange) {
        onDeletedRowsChange(nextDeletedRows);
      }
    };

    this._startEditRows = this._reduceEditingRows(startEditRows);
    this._stopEditRows = this._reduceEditingRows(stopEditRows);

    this._changeRow = this._reduceChangedRows(changeRow);
    this._cancelChangedRows = this._reduceChangedRows(cancelChanges);

    this._addRow = this._reduceAddedRows(addRow);
    this._changeAddedRow = this._reduceAddedRows(changeAddedRow);
    this._cancelAddedRows = this._reduceAddedRows(cancelAddedRows);

    this._deleteRows = this._reduceDeletedRows(deleteRows);
    this._cancelDeletedRows = this._reduceDeletedRows(cancelDeletedRows);

    this._commitAddedRows = (newRows, { rowIds }) => {
      const toCommit = newRowsByIds(newRows, rowIds);
      const changeSet = { created: toCommit };
      this._commitChanges(changeSet);
      this._cancelAddedRows(newRows, { rowIds });
    };
    this._commitChangedRows = (changedRows, { rowIds }) => {
      const toCommit = changedRowsByIds(changedRows, rowIds);
      const changeSet = { updated: toCommit };
      this._commitChanges(changeSet);
      this._cancelChangedRows(changedRows, { rowIds });
    };
    this._commitDeletedRows = (deletedRows, { rowIds }) => {
      const changeSet = { deleted: rowIds };
      this._commitChanges(changeSet);
      this._cancelDeletedRows(deletedRows, { rowIds });
    };

    this._commitChanges = (changeSet) => {
      const { onCommitChanges } = this.props;
      if (onCommitChanges) {
        onCommitChanges(changeSet);
      }
    };
  }
  render() {
    const editingRows = this.props.editingRows || this.state.editingRows;
    const changedRows = this.props.changedRows || this.state.changedRows;
    const newRows = this.props.newRows || this.state.newRows;
    const deletedRows = this.props.deletedRows || this.state.deletedRows;

    return (
      <PluginContainer>
        <Action
          name="startEditRows"
          action={({ rowIds }) => this._startEditRows(editingRows, { rowIds })}
        />
        <Action
          name="stopEditRows"
          action={({ rowIds }) => this._stopEditRows(editingRows, { rowIds })}
        />

        <Action
          name="addRow"
          action={() => this._addRow(newRows, { row: {} })}
        />
        <Action
          name="changeAddedRow"
          action={({ rowId, change }) => this._changeAddedRow(newRows, { rowId, change })}
        />
        <Action
          name="cancelAddedRows"
          action={({ rowIds }) => this._cancelAddedRows(newRows, { rowIds })}
        />
        <Action
          name="commitAddedRows"
          action={({ rowIds }) => this._commitAddedRows(newRows, { rowIds })}
        />

        <Action
          name="changeRow"
          action={({ rowId, change }) => this._changeRow(changedRows, { rowId, change })}
        />
        <Action
          name="cancelChangedRows"
          action={({ rowIds }) => this._cancelChangedRows(changedRows, { rowIds })}
        />
        <Action
          name="commitChangedRows"
          action={({ rowIds }) => this._commitChangedRows(changedRows, { rowIds })}
        />

        <Action
          name="deleteRows"
          action={({ rowIds }) => this._deleteRows(deletedRows, { rowIds })}
        />
        <Action
          name="cancelDeletedRows"
          action={({ rowIds }) => this._cancelDeletedRows(deletedRows, { rowIds })}
        />
        <Action
          name="commitDeletedRows"
          action={({ rowIds }) => this._commitDeletedRows(deletedRows, { rowIds })}
        />

        <Getter name="editingRows" value={editingRows} />
        <Getter name="changedRows" value={changedRows} />
        <Getter name="newRows" value={newRows} />
        <Getter name="deletedRows" value={deletedRows} />
      </PluginContainer>
    );
  }
}

EditingState.propTypes = {
  editingRows: PropTypes.array,
  defaultEditingRows: PropTypes.array,
  onEditingRowsChange: PropTypes.func,

  newRows: PropTypes.array,
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
  editingRows: undefined,
  defaultEditingRows: undefined,
  onEditingRowsChange: undefined,

  newRows: undefined,
  defaultAddedRows: undefined,
  onAddedRowsChange: undefined,

  deletedRows: undefined,
  defaultDeletedRows: undefined,
  onDeletedRowsChange: undefined,

  changedRows: undefined,
  defaultChangedRows: undefined,
  onChangedRowsChange: undefined,
};
