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

    this.reduceEditingRows = reducer => (editingRows, payload) => {
      const { onEditingRowsChange } = this.props;
      const nextEditingRows = reducer(editingRows, payload);
      this.setState({ editingRows: nextEditingRows });
      if (onEditingRowsChange) {
        onEditingRowsChange(nextEditingRows);
      }
    };
    this.reduceChangedRows = reducer => (changedRows, payload) => {
      const { onChangedRowsChange } = this.props;
      const nextChangedRows = reducer(changedRows, payload);
      this.setState({ changedRows: nextChangedRows });
      if (onChangedRowsChange) {
        onChangedRowsChange(nextChangedRows);
      }
    };
    this.reduceAddedRows = reducer => (addedRows, payload) => {
      const { onAddedRowsChange } = this.props;
      const nextAddedRows = reducer(addedRows, payload);
      this.setState({ addedRows: nextAddedRows });
      if (onAddedRowsChange) {
        onAddedRowsChange(nextAddedRows);
      }
    };
    this.reduceDeletedRows = reducer => (deletedRows, payload) => {
      const { onDeletedRowsChange } = this.props;
      const nextDeletedRows = reducer(deletedRows, payload);
      this.setState({ deletedRows: nextDeletedRows });
      if (onDeletedRowsChange) {
        onDeletedRowsChange(nextDeletedRows);
      }
    };

    this.startEditRows = this.reduceEditingRows(startEditRows);
    this.stopEditRows = this.reduceEditingRows(stopEditRows);

    this.changeRow = this.reduceChangedRows(changeRow);
    this.cancelChangedRows = this.reduceChangedRows(cancelChanges);

    this.addRow = this.reduceAddedRows(addRow);
    this.changeAddedRow = this.reduceAddedRows(changeAddedRow);
    this.cancelAddedRows = this.reduceAddedRows(cancelAddedRows);

    this.deleteRows = this.reduceDeletedRows(deleteRows);
    this.cancelDeletedRows = this.reduceDeletedRows(cancelDeletedRows);

    this.commitAddedRows = (addedRows, { rowIds }) => {
      const toCommit = addedRowsByIds(addedRows, rowIds);
      const changeSet = { added: toCommit };
      this.commitChanges(changeSet);
      this.cancelAddedRows(addedRows, { rowIds });
    };
    this.commitChangedRows = (changedRows, { rowIds }) => {
      const toCommit = changedRowsByIds(changedRows, rowIds);
      const changeSet = { changed: toCommit };
      this.commitChanges(changeSet);
      this.cancelChangedRows(changedRows, { rowIds });
    };
    this.commitDeletedRows = (deletedRows, { rowIds }) => {
      const changeSet = { deleted: rowIds };
      this.commitChanges(changeSet);
      this.cancelDeletedRows(deletedRows, { rowIds });
    };

    this.commitChanges = (changeSet) => {
      const { onCommitChanges } = this.props;
      if (onCommitChanges) {
        onCommitChanges(changeSet);
      }
    };

    this.createRowChangeComputed = ({ columns }) => computedCreateRowChange(columns);
  }
  render() {
    const editingRows = this.props.editingRows || this.state.editingRows;
    const changedRows = this.props.changedRows || this.state.changedRows;
    const addedRows = this.props.addedRows || this.state.addedRows;
    const deletedRows = this.props.deletedRows || this.state.deletedRows;
    const { createRowChange } = this.props;

    return (
      <PluginContainer
        pluginName="EditingState"
      >
        <Action
          name="startEditRows"
          action={({ rowIds }) => this.startEditRows(editingRows, { rowIds })}
        />
        <Action
          name="stopEditRows"
          action={({ rowIds }) => this.stopEditRows(editingRows, { rowIds })}
        />

        <Action
          name="addRow"
          action={() => this.addRow(addedRows, { row: {} })}
        />
        <Action
          name="changeAddedRow"
          action={({ rowId, change }) => this.changeAddedRow(addedRows, { rowId, change })}
        />
        <Action
          name="cancelAddedRows"
          action={({ rowIds }) => this.cancelAddedRows(addedRows, { rowIds })}
        />
        <Action
          name="commitAddedRows"
          action={({ rowIds }) => this.commitAddedRows(addedRows, { rowIds })}
        />

        <Action
          name="changeRow"
          action={({ rowId, change }) => this.changeRow(changedRows, { rowId, change })}
        />
        <Action
          name="cancelChangedRows"
          action={({ rowIds }) => this.cancelChangedRows(changedRows, { rowIds })}
        />
        <Action
          name="commitChangedRows"
          action={({ rowIds }) => this.commitChangedRows(changedRows, { rowIds })}
        />

        <Action
          name="deleteRows"
          action={({ rowIds }) => this.deleteRows(deletedRows, { rowIds })}
        />
        <Action
          name="cancelDeletedRows"
          action={({ rowIds }) => this.cancelDeletedRows(deletedRows, { rowIds })}
        />
        <Action
          name="commitDeletedRows"
          action={({ rowIds }) => this.commitDeletedRows(deletedRows, { rowIds })}
        />

        <Getter name="editingRows" value={editingRows} />
        <Getter name="changedRows" value={changedRows} />
        <Getter name="addedRows" value={addedRows} />
        <Getter name="deletedRows" value={deletedRows} />
        <Getter
          name="createRowChange"
          computed={createRowChange ?
            () => createRowChange :
            this.createRowChangeComputed
          }
        />
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
  defaultEditingRows: undefined,
  onEditingRowsChange: undefined,

  addedRows: undefined,
  defaultAddedRows: undefined,
  onAddedRowsChange: undefined,

  deletedRows: undefined,
  defaultDeletedRows: undefined,
  onDeletedRowsChange: undefined,

  changedRows: undefined,
  defaultChangedRows: undefined,
  onChangedRowsChange: undefined,
  createRowChange: undefined,
};
