import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

export default {
  data() {
    return {
      columns: Array.from({ length: 10000 })
        .map((item, index) => ({ name: `${index}`, title: `Column ${index}`, getCellValue: row => `[${row.id};${index}]` })),
      rows: Array.from({ length: 10000 })
        .map((item, index) => ({ id: index })),
    };
  },
  methods: {
    getRowId(row) {
      return row.id;
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
        :getRowId="getRowId"
      >
        <dx-virtual-table />
        <dx-table-header-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
  },
};
