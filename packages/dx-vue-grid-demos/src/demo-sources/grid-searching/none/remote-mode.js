import { DxSearchState } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
  DxToolbar,
  DxSearchPanel,
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
      searchValue: '',
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
    changeFilters(searchValue) {
      this.loading = true;
      this.searchValue = searchValue;
    },
    queryString() {
      const { searchValue, columns } = this;

      let filter = columns.reduce((acc, { name }) => {
        acc.push(`["${name}", "contains", "${encodeURIComponent(searchValue)}"]`);
        return acc;
      }, []).join(',"or",');

      if (columns.length > 1) {
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
        <dx-search-state
          :value.sync="searchValue"
          @update:value="changeFilters"
        />
        <dx-virtual-table />
        <dx-table-header-row />
        <dx-toolbar />
        <dx-search-panel />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxSearchState,
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
    DxLoading,
    DxToolbar,
    DxSearchPanel,
  },
};
