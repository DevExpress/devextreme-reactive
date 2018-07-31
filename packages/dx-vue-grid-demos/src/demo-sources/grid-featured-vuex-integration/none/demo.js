import Vue from 'vue';
import Vuex from 'vuex';
import {
  DxSortingState,
  DxIntegratedSorting,
  DxGroupingState,
  DxIntegratedGrouping,
  DxRowDetailState,
  DxFilteringState,
  DxIntegratedFiltering,
  DxSelectionState,
  DxIntegratedSelection,
  DxPagingState,
  DxIntegratedPaging,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableBandHeader,
  DxTableHeaderRow,
  DxTableRowDetail,
  DxTableGroupRow,
  DxTableFilterRow,
  DxTableSelection,
  DxToolbar,
  DxGroupingPanel,
  DxPagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../../demo-data/generator';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    rows: generateRows({
      columnValues: {
        ...employeeValues,
        tasks: ({ random }) => generateRows({
          columnValues: employeeTaskValues,
          length: Math.floor(random() * 3) + 4,
          random,
        }),
      },
      length: 40,
    }),
    sorting: [],
    grouping: [],
    expandedGroups: [],
    selection: [],
    expandedRowIds: [1],
    filters: [],
    currentPage: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15],
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    gridStateChange(state, payload) {
      state[payload.field] = payload.value;
    },
    /* eslint-enable no-param-reassign */
  },
});

const MyRowDetail = {
  props: ['row'],
  data() {
    return {
      detailColumns: [
        { name: 'subject', title: 'Subject' },
        { name: 'startDate', title: 'Start Date' },
        { name: 'dueDate', title: 'Due Date' },
        { name: 'priority', title: 'Priority' },
        { name: 'status', title: 'Status' },
      ],
      tableDetailColumnExtensions: [
        { columnName: 'startDate', width: 115 },
        { columnName: 'dueDate', width: 115 },
        { columnName: 'priority', width: 100 },
        { columnName: 'status', width: 125 },
      ],
    };
  },
  template: `
    <div style="margin: 20px;">
      <div>
        <h5>{{row.firstName}} {{row.lastName}}'s Tasks:</h5>
      </div>
      <div class="card">
        <dx-grid
          :rows="row.tasks"
          :columns="detailColumns"
        >
          <dx-table
            :columnExtensions="tableDetailColumnExtensions"
          />
          <dx-table-header-row />
        </dx-grid>
      </div>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'prefix', title: 'Title' },
        { name: 'firstName', title: 'First Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'birthDate', title: 'Birth Date' },
        { name: 'position', title: 'Position' },
        { name: 'state', title: 'State' },
      ],
      columnBands: [
        {
          title: 'Personal Data',
          children: [
            {
              title: 'Full Name',
              children: [
                { columnName: 'firstName' },
                { columnName: 'lastName' },
              ],
            },
            { columnName: 'birthDate' },
          ],
        },
        {
          title: 'Work Information',
          children: [
            { columnName: 'state' },
            { columnName: 'position' },
          ],
        },
      ],
      tableColumnExtensions: [
        { columnName: 'prefix', width: 80 },
        { columnName: 'firstName', width: 130 },
        { columnName: 'lastName', width: 130 },
        { columnName: 'position', width: 170 },
        { columnName: 'state', width: 125 },
        { columnName: 'birthDate', width: 125 },
      ],
    };
  },
  computed: {
    rows() { return store.state.rows; },
    expandedRowIds() { return store.state.expandedRowIds; },
    sorting() { return store.state.sorting; },
    grouping() { return store.state.grouping; },
    expandedGroups() { return store.state.expandedGroups; },
    filters() { return store.state.filters; },
    selection() { return store.state.selection; },
    currentPage() { return store.state.currentPage; },
    pageSize() { return store.state.pageSize; },
    pageSizes() { return store.state.pageSizes; },
  },
  methods: {
    updateExpandedRowIds(e) { store.commit('gridStateChange', { field: 'expandedRowIds', value: e }); },
    updateSorting(e) { store.commit('gridStateChange', { field: 'sorting', value: e }); },
    updateGrouping(e) { store.commit('gridStateChange', { field: 'grouping', value: e }); },
    updateExpandedGroups(e) { store.commit('gridStateChange', { field: 'expandedGroups', value: e }); },
    updateFilters(e) { store.commit('gridStateChange', { field: 'filters', value: e }); },
    updateSelection(e) { store.commit('gridStateChange', { field: 'selection', value: e }); },
    updateCurrentPage(e) { store.commit('gridStateChange', { field: 'currentPage', value: e }); },
    updatePageSize(e) { store.commit('gridStateChange', { field: 'pageSize', value: e }); },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-sorting-state
          :sorting="sorting"
          @update:sorting="updateSorting"
        />
        <dx-grouping-state
          :grouping="grouping"
          @update:grouping="updateGrouping"
          :expandedGroups="expandedGroups"
          @update:expandedGroups="updateExpandedGroups"
        />
        <dx-row-detail-state
          :expandedRowIds="expandedRowIds"
          @update:expandedRowIds="updateExpandedRowIds"
        />
        <dx-filtering-state
          :filters="filters"
          @update:filters="updateFilters"
        />
        <dx-selection-state
          :selection="selection"
          @update:selection="updateSelection"
        />
        <dx-paging-state
          :currentPage="currentPage"
          @update:currentPage="updateCurrentPage"
          :pageSize="pageSize"
          @update:pageSize="updatePageSize"
        />
        <dx-integrated-filtering />
        <dx-integrated-sorting />
        <dx-integrated-grouping />
        <dx-integrated-selection />
        <dx-integrated-paging />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row
          showSortingControls
          showGroupingControls
        />
        <dx-table-filter-row />
        <dx-table-selection
          showSelectAll
        />
        <dx-table-row-detail
          :contentComponent="$options.components.MyRowDetail"
        />
        <dx-table-group-row />
        <dx-toolbar />
        <dx-grouping-panel
          showGroupingControls
        />
        <dx-paging-panel
          :pageSizes="pageSizes"
        />
        <dx-table-band-header
          :columnBands="columnBands"
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxSortingState,
    DxIntegratedSorting,
    DxGroupingState,
    DxIntegratedGrouping,
    DxRowDetailState,
    DxFilteringState,
    DxIntegratedFiltering,
    DxSelectionState,
    DxIntegratedSelection,
    DxPagingState,
    DxIntegratedPaging,
    DxGrid,
    DxTable,
    DxTableBandHeader,
    DxTableHeaderRow,
    DxTableGroupRow,
    DxTableFilterRow,
    DxTableRowDetail,
    DxTableSelection,
    DxToolbar,
    DxGroupingPanel,
    DxPagingPanel,
    MyRowDetail,
  },
};
