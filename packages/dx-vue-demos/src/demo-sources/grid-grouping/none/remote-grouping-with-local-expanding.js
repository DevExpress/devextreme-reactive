import { DxGroupingState, DxCustomGrouping } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
  DxTableGroupRow,
  DxGroupingPanel,
  DxToolbar,
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
      grouping: [],
      expandedGroups: [],
      tempGrouping: null,
      tempExpandedGroups: null,
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
    getRowId(row) {
      return row.OrderID;
    },
    getChildGroups(groups) {
      return groups.map(group => ({ key: group.key, childRows: group.items }));
    },
    changeGrouping(grouping) {
      this.loading = true;
      this.tempGrouping = this.grouping;
      this.tempExpandedGroups = this.expandedGroups;
      this.grouping = grouping;
    },
    queryString() {
      const { grouping } = this;
      if (!grouping.length) return URL;

      const groupConfig = grouping
        .map(columnGrouping => ({
          selector: columnGrouping.columnName,
          isExpanded: true,
        }));
      return `${URL}?group=${JSON.stringify(groupConfig)}`;
    },
    loadData() {
      if (!this.loading) return;

      const queryString = this.queryString();
      fetch(queryString, { mode: 'cors' })
        .then(response => response.json())
        .then((orders) => {
          this.rows = orders.data;
          this.loading = false;
          this.tempGrouping = null;
          this.tempExpandedGroups = null;
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
        :getRowId="getRowId"
      >
        <dx-grouping-state
          :grouping="grouping"
          :expandedGroups.sync="expandedGroups"
          @update:grouping="changeGrouping"
        />
        <dx-custom-grouping
          :getChildGroups="getChildGroups"
          :grouping="tempGrouping"
          :expandedGroups="tempExpandedGroups"
        />
        <dx-virtual-table />
        <dx-table-header-row showGroupingControls />
        <dx-table-group-row />
        <dx-toolbar />
        <dx-grouping-panel showGroupingControls />
      </dx-grid>
      <dx-loading v-if="loading" />
    </div>
  `,
  components: {
    DxGroupingState,
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
    DxTableGroupRow,
    DxGroupingPanel,
    DxCustomGrouping,
    DxLoading,
    DxToolbar,
  },
};
