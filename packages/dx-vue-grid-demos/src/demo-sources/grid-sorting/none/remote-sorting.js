import { DxSortingState } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { Loading as DxLoading } from '../../../theme-sources/none/components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default {
  data() {
    return {
      columns: [
        { name: 'OrderNumber', title: 'Order Number' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'StoreState', title: 'Store State' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount' },
      ],
      rows: [],
      sorting: [{ columnName: 'StoreCity', direction: 'asc' }],
      loading: true,
    };
  },
  mounted() {
    this.loadData();
  },
  updated() {
    this.loadData();
  },
  methods: {
    changeSorting(sorting) {
      this.loading = true;
      this.sorting = sorting;
    },
    queryString() {
      let queryString = `${URL}?`;

      const columnSorting = this.sorting[0];
      if (columnSorting) {
        const sortDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
        queryString = `${queryString}orderby=${columnSorting.columnName}${sortDirectionString}`;
      }
      return queryString;
    },
    loadData() {
      const queryString = this.queryString();
      if (queryString === this.lastQuery) {
        this.loading = false;
        return;
      }

      fetch(queryString)
        .then(response => response.json())
        .then((data) => {
          this.rows = data.items;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
      this.lastQuery = queryString;
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-sorting-state
          :sorting.sync="sorting"
          @update:sorting="changeSorting"
        />
        <dx-virtual-table />
      <dx-table-header-row showSortingControls />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxSortingState,
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
    DxLoading,
  },
};
