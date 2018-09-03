import { DxFilteringState } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxVirtualTable,
  DxTableHeaderRow,
  DxTableFilterRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { Loading as DxLoading } from '../../../theme-sources/none/components/loading';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/Orders';

export default {
  data() {
    return {
      columns: [
        { name: 'ShipCountry', title: 'Country' },
        { name: 'ShipCity', title: 'City' },
        { name: 'ShipAddress', title: 'Address' },
      ],
      rows: [],
      filters: [],
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
    changeFilters(filters) {
      this.loading = true;
      this.filters = filters;
    },
    queryString() {
      const { filters } = this;

      let filter = filters.reduce((acc, { columnName, value }) => {
        acc.push(`["${columnName}", "contains", "${encodeURIComponent(value)}"]`);
        return acc;
      }, []).join(',"and",');

      if (filters.length > 1) {
        filter = `[${filter}]`;
      }

      return `${URL}?filter=${filter}`;
    },
    loadData() {
      const queryString = this.queryString();
      if (queryString === this.lastQuery) {
        this.loading = false;
        return;
      }

      fetch(queryString)
        .then(response => response.json())
        .then((orders) => {
          this.rows = orders.data;
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
        <dx-filtering-state
          :filters.sync="filters"
          @update:filters="changeFilters"
        />
        <dx-virtual-table />
        <dx-table-header-row />
        <dx-table-filter-row />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxFilteringState,
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
    DxTableFilterRow,
    DxLoading,
    DxTable,
  },
};
