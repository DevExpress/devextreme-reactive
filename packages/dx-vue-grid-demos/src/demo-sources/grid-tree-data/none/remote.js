import {
  DxTreeDataState,
  DxCustomTreeData,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
  DxTableTreeColumn,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { Loading as DxLoading } from '../../../theme-sources/none/components/loading';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/treeListData';
const ROOT_ID = '';

export default {
  created() {
    this.getRowId = row => row.id;
    this.getChildRows = (row, rootRows) => {
      const childRows = rootRows.filter(r => r.parentId === (row ? row.id : ROOT_ID));
      if (childRows.length) {
        return childRows;
      }
      return row && row.hasItems ? [] : null;
    };
  },
  data() {
    return {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'size', title: 'Size', getCellValue: row => (row.size ? `${Math.ceil(row.size / 1024)} KB` : '') },
        { name: 'createdDate', title: 'Created Date', getCellValue: row => new Date(Date.parse(row.createdDate)).toLocaleString() },
        { name: 'modifiedDate', title: 'Modified Date', getCellValue: row => new Date(Date.parse(row.modifiedDate)).toLocaleString() },
      ],
      tableColumnExtensions: [
        { columnName: 'name', width: 400 },
        { columnName: 'size', width: 120, align: 'right' },
      ],
      expandedRowIds: [],
      data: [],
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  updated() {
    this.loadData();
  },
  methods: {
    loadData() {
      const { expandedRowIds, data, loading } = this;

      if (loading) {
        return;
      }

      const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
        .filter(rowId => data.findIndex(row => row.parentId === rowId) === -1);

      if (rowIdsWithNotLoadedChilds.length) {
        if (this.loading) return;
        this.loading = true;
        Promise.all(rowIdsWithNotLoadedChilds
          .map(rowId => fetch(`${URL}?parentIds=${rowId}`, { mode: 'cors' })
            .then(response => response.json())))
          .then((loadedData) => {
            this.data = data.concat(...loadedData);
            this.loading = false;
          })
          .catch(() => { this.loading = false; });
      }
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="data"
        :columns="columns"
        :getRowId="getRowId"
      >
        <dx-tree-data-state
          :expandedRowIds.sync="expandedRowIds"
        />
        <dx-custom-tree-data
          :getChildRows="getChildRows"
        />
        <dx-virtual-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
        <dx-table-tree-column
          for="name"
        />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxGrid,
    DxTreeDataState,
    DxCustomTreeData,
    DxVirtualTable,
    DxTableHeaderRow,
    DxTableTreeColumn,
    DxLoading,
  },
};
