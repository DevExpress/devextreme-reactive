import {
  DxPagingState,
  DxIntegratedPaging,
  DxCustomPaging,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxPagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { Loading as DxLoading } from '../../../theme-sources/none/components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default {
  data() {
    return {
      rows: [],
      columns: [
        { name: 'OrderNumber', title: 'Order Number' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'StoreState', title: 'Store State' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount' },
      ],
      currentPage: 0,
      totalCount: 0,
      pageSize: 6,
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
    queryString() {
      const { pageSize, currentPage } = this;

      return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
    },
    loadData() {
      const queryString = this.queryString();
      if (queryString === this.lastQuery) {
        this.loading = false;
        return;
      }

      this.loading = true;
      fetch(queryString)
        .then(response => response.json())
        .then((data) => {
          this.rows = data.items;
          this.totalCount = data.totalCount;
          this.lastQuery = queryString;
          this.loading = false;
        })
        .catch(() => {
          this.loading = true;
        });
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-paging-state
          :currentPage.sync="currentPage"
          :pageSize="pageSize"
        />
        <dx-custom-paging
          :totalCount="totalCount"
        />
        <dx-table />
        <dx-table-header-row />
        <dx-paging-panel />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxPagingState,
    DxIntegratedPaging,
    DxCustomPaging,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxPagingPanel,
    DxLoading,
  },
};
