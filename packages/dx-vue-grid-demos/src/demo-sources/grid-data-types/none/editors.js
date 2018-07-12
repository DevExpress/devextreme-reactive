import {
  DxEditingState,
  DxDataTypeProvider,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableEditRow,
  DxTableEditColumn,
} from '@devexpress/dx-vue-grid-bootstrap4';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const BooleanFormatter = {
  props: ['value'],
  template: `
    <span class="badge badge-secondary">{{ value === true ? 'Yes' : 'No' }}</span>
  `,
};

const BooleanEditor = {
  props: ['value'],
  template: `
    <select
      class="form-control"
      :value="value"
      @change="e => this.$emit('valueChange', e.target.value === 'true')"
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </select>
  `,
};

const BooleanTypeProvider = {
  template: `
    <dx-data-type-provider
      :formatterComponent="$options.components.BooleanFormatter"
      :editorComponent="$options.components.BooleanEditor"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    BooleanFormatter,
    BooleanEditor,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'units', title: 'Units' },
        { name: 'shipped', title: 'Shipped' },
      ],
      booleanColumns: ['shipped'],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 8,
      }),
      tableColumnExtensions: [
        { columnName: 'id', width: 60 },
      ],
      editingRowIds: [0],
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
        <boolean-type-provider
          :for="booleanColumns"
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
    BooleanTypeProvider,
  },
};
