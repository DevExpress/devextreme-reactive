import {
  DxFilteringState,
  DxSortingState,
  DxGroupingState,
  DxSelectionState,
  DxIntegratedFiltering,
  DxIntegratedSorting,
  DxIntegratedGrouping,
  DxIntegratedSelection,
} from '@devexpress/dx-vue-grid';

import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
  DxTableFilterRow,
  DxTableGroupRow,
  DxTableSelection,
  DxToolbar,
  DxGroupingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

import { ProgressBarCell } from '../../../theme-sources/none/components/progress-bar-cell';
import { HighlightedCell } from '../../../theme-sources/none/components/highlighted-cell';
import { CurrencyTypeProvider } from '../../../theme-sources/none/components/currency-type-provider';
import { PercentTypeProvider } from '../../../theme-sources/none/components/percent-type-provider';
import { BooleanTypeProvider } from '../../../theme-sources/none/components/boolean-type-provider';

const MyCell = {
  inheritAttrs: false,
  props: ['column'],
  data() {
    return ({
      componentIds: {
        discount: 'progress-bar-cell',
        amount: 'highlighted-cell',
      },
    });
  },
  computed: {
    currentCellComponent() {
      return this.componentIds[this.column.name] || 'dx-cell';
    },
  },
  template: `
    <component
      :is="currentCellComponent"
      :column="column"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </component>
  `,
  components: {
    DxCell: DxVirtualTable.components.DxCell,
    ProgressBarCell,
    HighlightedCell,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'channel', title: 'Channel' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
        { name: 'units', title: 'Units' },
        { name: 'shipped', title: 'Shipped' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
        { columnName: 'units', align: 'right' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 200000,
      }),
      filters: [{ columnName: 'saleDate', value: '2016-02' }],
      sorting: [
        { columnName: 'product', direction: 'asc' },
        { columnName: 'saleDate', direction: 'asc' },
      ],
      grouping: [{ columnName: 'product' }],
      expandedGroups: ['EnviroCare Max'],
      selection: [],
      currencyColumns: ['amount'],
      percentColumns: ['discount'],
      booleanColumns: ['shipped'],
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
        <percent-type-provider
          :for="percentColumns"
        />
        <currency-type-provider
          :for="currencyColumns"
        />
        <boolean-type-provider
          :for="booleanColumns"
        />
        <dx-filtering-state
          :filters.sync="filters"
        />
        <dx-sorting-state
          :sorting.sync="sorting"
        />
        <dx-grouping-state
          :grouping.sync="grouping"
          :expandedGroups.sync="expandedGroups"
        />
        <dx-selection-state
          :selection.sync="selection"
        />
        <dx-integrated-filtering />
        <dx-integrated-sorting />
        <dx-integrated-grouping />
        <dx-integrated-selection />
        <dx-virtual-table
          :columnExtensions="tableColumnExtensions"
          :cellComponent="$options.components.MyCell"
        />
        <dx-table-header-row
          showSortingControls
          showGroupingControls
        />
        <dx-table-filter-row />
        <dx-table-selection
          showSelectAll
        />
        <dx-table-group-row />
        <dx-toolbar />
        <dx-grouping-panel
          showSortingControls
          showGroupingControls
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxFilteringState,
    DxSortingState,
    DxGroupingState,
    DxSelectionState,
    DxIntegratedFiltering,
    DxIntegratedSorting,
    DxIntegratedGrouping,
    DxIntegratedSelection,
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
    DxTableFilterRow,
    DxTableGroupRow,
    DxTableSelection,
    DxToolbar,
    DxGroupingPanel,
    MyCell,
    CurrencyTypeProvider,
    PercentTypeProvider,
    BooleanTypeProvider,
  },
};
