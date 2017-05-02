import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  startEditRows,
  stopEditRows,

  addNewRow,
  changeNewRow,
  cancelNewRows,
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
      newRows: props.defaultNewRows || [],
      changedRows: props.defaultChangedRows || {},
      deletedRows: props.defaultDeletedRows || [],
    };

    this._reduceEditingRows = reducer => (editingRows, payload) => {
      const { editingRowsChange } = this.props;
      const nextEditingRows = reducer(editingRows, payload);
      this.setState({ editingRows: nextEditingRows });
      if (editingRowsChange) {
        editingRowsChange(nextEditingRows);
      }
    };
    this._reduceChangedRows = reducer => (changedRows, payload) => {
      const { changedRowsChange } = this.props;
      const nextChangedRows = reducer(changedRows, payload);
      this.setState({ changedRows: nextChangedRows });
      if (changedRowsChange) {
        changedRowsChange(nextChangedRows);
      }
    };
    this._reduceNewRows = reducer => (newRows, payload) => {
      const { newRowsChange } = this.props;
      const nextNewRows = reducer(newRows, payload);
      this.setState({ newRows: nextNewRows });
      if (newRowsChange) {
        newRowsChange(nextNewRows);
      }
    };
    this._reduceDeletedRows = reducer => (deletedRows, payload) => {
      const { deletedRowsChange } = this.props;
      const nextDeletedRows = reducer(deletedRows, payload);
      this.setState({ deletedRows: nextDeletedRows });
      if (deletedRowsChange) {
        deletedRowsChange(nextDeletedRows);
      }
    };

    this._startEditRows = this._reduceEditingRows(startEditRows);
    this._stopEditRows = this._reduceEditingRows(stopEditRows);

    this._changeRow = this._reduceChangedRows(changeRow);
    this._cancelChangedRows = this._reduceChangedRows(cancelChanges);

    this._addNewRow = this._reduceNewRows(addNewRow);
    this._changeNewRow = this._reduceNewRows(changeNewRow);
    this._cancelNewRows = this._reduceNewRows(cancelNewRows);

    this._deleteRows = this._reduceDeletedRows(deleteRows);
    this._cancelDeletedRows = this._reduceDeletedRows(cancelDeletedRows);

    this._commitNewRows = (newRows, { rowIds }) => {
      const toCommit = newRowsByIds(newRows, rowIds);
      const changeSet = { created: toCommit };
      this._commitChanges(changeSet);
      this._cancelNewRows(newRows, { rowIds });
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
          name="addNewRow"
          action={() => this._addNewRow(newRows, { row: {} })}
        />
        <Action
          name="changeNewRow"
          action={({ rowId, change }) => this._changeNewRow(newRows, { rowId, change })}
        />
        <Action
          name="cancelNewRows"
          action={({ rowIds }) => this._cancelNewRows(newRows, { rowIds })}
        />
        <Action
          name="commitNewRows"
          action={({ rowIds }) => this._commitNewRows(newRows, { rowIds })}
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
  editingRowsChange: PropTypes.func,

  newRows: PropTypes.array,
  defaultNewRows: PropTypes.array,
  newRowsChange: PropTypes.func,

  changedRows: PropTypes.object,
  defaultChangedRows: PropTypes.object,
  changedRowsChange: PropTypes.func,

  deletedRows: PropTypes.array,
  defaultDeletedRows: PropTypes.array,
  deletedRowsChange: PropTypes.func,

  onCommitChanges: PropTypes.func.isRequired,
};

EditingState.defaultProps = {
  editingRows: undefined,
  defaultEditingRows: undefined,
  editingRowsChange: undefined,

  newRows: undefined,
  defaultNewRows: undefined,
  newRowsChange: undefined,

  deletedRows: undefined,
  defaultDeletedRows: undefined,
  deletedRowsChange: undefined,

  changedRows: undefined,
  defaultChangedRows: undefined,
  changedRowsChange: undefined,
};
