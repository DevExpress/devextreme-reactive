import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
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

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'editingEnabled', defaultValue);

export const DxEditingState = {
  name: 'DxEditingState',
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
      default: () => ({}),
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
      <DxPlugin
        name="DxEditingState"
      >
        <DxGetter
          name="createRowChange"
          value={createRowChangeGetter(createRowChange, columnExtensions)}
        />

        <DxGetter name="editingRowIds" value={editingRowIds} />
        <DxAction name="startEditRows" action={this.startEditRows} />
        <DxAction name="stopEditRows" action={this.stopEditRows} />

        <DxGetter name="rowChanges" value={rowChanges} />
        <DxAction name="changeRow" action={this.changeRow} />
        <DxAction name="cancelChangedRows" action={this.cancelChangedRows} />
        <DxAction name="commitChangedRows" action={this.commitChangedRows} />

        <DxGetter name="addedRows" value={addedRows} />
        <DxAction name="addRow" action={this.addRow} />
        <DxAction name="changeAddedRow" action={this.changeAddedRow} />
        <DxAction name="cancelAddedRows" action={this.cancelAddedRows} />
        <DxAction name="commitAddedRows" action={this.commitAddedRows} />

        <DxGetter name="deletedRowIds" value={deletedRowIds} />
        <DxAction name="deleteRows" action={this.deleteRows} />
        <DxAction name="cancelDeletedRows" action={this.cancelDeletedRows} />
        <DxAction name="commitDeletedRows" action={this.commitDeletedRows} />

        <DxGetter
          name="isColumnEditingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnEditingEnabled)}
        />
      </DxPlugin>
    );
  },
};
