import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Action, Plugin, createStateHelper,
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

const columnExtensionValueGetter = (columnExtensions, defaultValue) => getColumnExtensionValueGetter(columnExtensions, 'editingEnabled', defaultValue);

export class EditingState extends React.PureComponent {
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

    const stateHelper = createStateHelper(
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

EditingState.propTypes = {
  createRowChange: PropTypes.func,
  columnEditingEnabled: PropTypes.bool,
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
  columnEditingEnabled: true,
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
