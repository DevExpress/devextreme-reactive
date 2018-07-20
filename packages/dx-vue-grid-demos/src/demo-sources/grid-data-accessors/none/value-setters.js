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
  defaultNestedColumnValues,
} from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        {
          name: 'firstName',
          title: 'First Name',
          getCellValue: row => (row.user ? row.user.firstName : undefined),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          getCellValue: row => (row.user ? row.user.lastName : undefined),
        },
        {
          name: 'car',
          title: 'Car',
          getCellValue: row => (row.car ? row.car.model : undefined),
        },
        { name: 'position', title: 'Position' },
        { name: 'city', title: 'City' },
      ],
      editingColumnExtensions: [
        {
          columnName: 'firstName',
          createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
        },
        {
          columnName: 'lastName',
          createRowChange: (row, value) => ({ user: { ...row.user, lastName: value } }),
        },
        {
          columnName: 'car',
          createRowChange: (row, value) => ({ car: { model: value } }),
        },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
        length: 8,
      }),
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
          :columnExtensions="editingColumnExtensions"
          v-on:commitChanges="commitChanges"
          :addedRows.sync="addedRows"
          :rowChanges.sync="rowChanges"
          :deletedRowIds.sync="deletedRowIds"
          :editingRowIds.sync="editingRowIds"
        />
        <dx-table />
        <dx-table-header-row />
        <dx-table-edit-row />
        <dx-table-edit-column
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxEditingState,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableEditColumn,
    DxTableEditRow,
  },
};
