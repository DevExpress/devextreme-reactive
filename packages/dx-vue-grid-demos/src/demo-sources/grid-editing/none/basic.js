import { DxEditingState } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableEditRow,
  DxTableEditColumn,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  defaultColumnValues,
} from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 8,
      }),
      tableColumnExtensions: [
        { columnName: 'id', width: 60 },
      ],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      deletedRowIds: [],
    };
  },
  methods: {
    getRowId(row) {
      return row.id;
    },
    commitChanges({ added, changed, deleted }) {
      let { rows } = this;
      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.rows = rows;
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
        :getRowId="getRowId"
      >
        <dx-editing-state
          v-on:commitChanges="commitChanges"
          :addedRows.sync="addedRows"
          :rowChanges.sync="rowChanges"
          :deletedRowIds.sync="deletedRowIds"
          :editingRowIds.sync="editingRowIds"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
        <dx-table-edit-row />
        <dx-table-edit-column
          :showAddCommand="!addedRows.length"
          showEditCommand
          showDeleteCommand
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxEditingState,
    DxTableEditRow,
    DxTableEditColumn,
  },
};
