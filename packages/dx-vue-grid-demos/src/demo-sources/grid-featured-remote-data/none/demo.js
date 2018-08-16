import {
  DxPagingState,
  DxSortingState,
  DxCustomPaging,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxPagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { Loading as DxLoading } from '../../../theme-sources/none/components/loading';
import { CurrencyTypeProvider } from '../../../theme-sources/none/components/currency-type-provider';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default {
  data() {
    return {
      columns: [
        { name: 'OrderNumber', title: 'Order #' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount' },
      ],
      currencyColumns: ['SaleAmount'],
      tableColumnExtensions: [
        { columnName: 'OrderNumber', align: 'right' },
        { columnName: 'SaleAmount', align: 'right' },
      ],
      rows: [],
      sorting: [{ columnName: 'StoreCity', direction: 'asc' }],
      totalCount: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      currentPage: 0,
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
    changeCurrentPage(currentPage) {
      this.loading = true;
      this.currentPage = currentPage;
    },
    changePageSize(pageSize) {
      const totalPages = Math.ceil(this.totalCount / pageSize);
      const currentPage = Math.min(this.currentPage, totalPages - 1);

      this.loading = true;
      this.pageSize = pageSize;
      this.currentPage = currentPage;
    },
    queryString() {
      const { sorting, pageSize, currentPage } = this;

      let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

      const columnSorting = sorting[0];
      if (columnSorting) {
        const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
        queryString = `${queryString}&orderby=${columnSorting.columnName}${sortingDirectionString}`;
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
          this.totalCount = data.totalCount;
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
        <currency-type-provider
          :for="currencyColumns"
        />
        <dx-sorting-state
          :sorting="sorting"
          @update:sorting="changeSorting"
        />
        <dx-paging-state
          :currentPage="currentPage"
          @update:currentPage="changeCurrentPage"
          :pageSize="pageSize"
          @update:pageSize="changePageSize"
        />
        <dx-custom-paging
          :totalCount="totalCount"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row
          showSortingControls
        />
        <dx-paging-panel
          :pageSizes="pageSizes"
        />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxSortingState,
    DxPagingState,
    DxCustomPaging,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxPagingPanel,
    DxLoading,
    CurrencyTypeProvider,
  },
};
