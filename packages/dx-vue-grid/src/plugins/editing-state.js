import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
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

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'editingEnabled', defaultValue);

export const EditingState = {
  name: 'EditingState',
  props: {
    createRowChange: {
      type: Function,
    },
    columnEditingEnabled: {
      type: Boolean,
      default: true,
    },
    columnExtensions: {
      type: Array,
    },
    editingRowIds: {
      type: Array,
      default: () => [],
    },
    addedRows: {
      type: Array,
      default: () => [],
    },
    rowChanges: {
      type: Object,
      default: () => {},
    },
    deletedRowIds: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    startEditRows(payload) {
      this.$emit(
        'update:editingRowIds',
        startEditRows(this.editingRowIds, payload),
      );
    },
    stopEditRows(payload) {
      this.$emit(
        'update:editingRowIds',
        stopEditRows(this.editingRowIds, payload),
      );
    },
    changeRow(payload) {
      this.$emit(
        'update:rowChanges',
        changeRow(this.rowChanges, payload),
      );
    },
    cancelChangedRows(payload) {
      this.$emit(
        'update:rowChanges',
        cancelChanges(this.rowChanges, payload),
      );
    },
    commitChangedRows({ rowIds }) {
      this.$emit(
        'commitChanges',
        { changed: changedRowsByIds(this.rowChanges, rowIds) },
      );
      this.cancelChangedRows({ rowIds });
    },
    addRow(payload) {
      this.$emit(
        'update:addedRows',
        addRow(this.addedRows, payload),
      );
    },
    changeAddedRow(payload) {
      this.$emit(
        'update:addedRows',
        changeAddedRow(this.addedRows, payload),
      );
    },
    cancelAddedRows(payload) {
      this.$emit(
        'update:addedRows',
        cancelAddedRows(this.addedRows, payload),
      );
    },
    commitAddedRows({ rowIds }) {
      this.$emit(
        'commitChanges',
        { added: addedRowsByIds(this.addedRows, rowIds) },
      );
      this.cancelAddedRows({ rowIds });
    },
    deleteRows(payload) {
      this.$emit(
        'update:deletedRowIds',
        deleteRows(this.deletedRowIds, payload),
      );
    },
    cancelDeletedRows(payload) {
      this.$emit(
        'update:deletedRowIds',
        cancelDeletedRows(this.deletedRowIds, payload),
      );
    },
    commitDeletedRows({ rowIds }) {
      this.$emit(
        'commitChanges',
        { deleted: rowIds },
      );
      this.cancelDeletedRows({ rowIds });
    },
  },
  render() {
    const {
      createRowChange,
      columnExtensions,
      columnEditingEnabled,
      editingRowIds,
      rowChanges,
      addedRows,
      deletedRowIds,
    } = this;

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
  },
};
