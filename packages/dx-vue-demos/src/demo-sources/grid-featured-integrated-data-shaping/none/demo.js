import {
  DxFilteringState,
  DxSortingState,
  DxGroupingState,
  DxPagingState,
  DxSelectionState,
  DxIntegratedFiltering,
  DxIntegratedSorting,
  DxIntegratedGrouping,
  DxIntegratedPaging,
  DxIntegratedSelection,
} from '@devexpress/dx-vue-grid';

import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableFilterRow,
  DxTableGroupRow,
  DxTableSelection,
  DxPagingPanel,
  DxToolbar,
  DxGroupingPanel,
  DxColumnChooser,
  DxTableColumnVisibility,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

import { ProgressBarCell } from '../../../theme-sources/none/components/progress-bar-cell';
import { HighlightedCell } from '../../../theme-sources/none/components/highlighted-cell';
import { CurrencyTypeProvider } from '../../../theme-sources/none/components/currency-type-provider';
import { PercentTypeProvider } from '../../../theme-sources/none/components/percent-type-provider';

const MyCell = {
  inheritAttrs: false,
  props: ['column'],
  data() {
    const componentIds = {
      discount: 'progress-bar-cell',
      amount: 'highlighted-cell',
    };
    return {
      componentId: componentIds[this.column.name] || 'dx-cell',
    };
  },
  template: `
    <component
      :is="componentId"
      :column="column"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </component>
  `,
  components: {
    DxCell: DxTable.components.DxCell,
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
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 1000 }),
      filters: [{ columnName: 'saleDate', value: '2016-02' }],
      sorting: [
        { columnName: 'product', direction: 'asc' },
        { columnName: 'saleDate', direction: 'asc' },
      ],
      grouping: [{ columnName: 'product' }],
      expandedGroups: ['EnviroCare Max'],
      selection: [],
      currentPage: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      currencyColumns: ['amount'],
      percentColumns: ['discount'],
      hiddenColumnNames: ['customer'],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <percent-type-provider
          :for="percentColumns"
        />
        <currency-type-provider
          :for="currencyColumns"
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
        <dx-paging-state
          :pageSize.sync="pageSize"
          :currentPage.sync="currentPage"
        />
        <dx-selection-state
          :selection.sync="selection"
        />
        <dx-integrated-filtering />
        <dx-integrated-sorting />
        <dx-integrated-grouping />
        <dx-integrated-paging />
        <dx-integrated-selection />
        <dx-table
          :columnExtensions="tableColumnExtensions"
          :cellComponent="$options.components.MyCell"
        />
        <dx-table-header-row
          showSortingControls
          showGroupingControls
        />
        <dx-table-filter-row
          showFilterSelector
        />
        <dx-table-selection
          showSelectAll
        />
        <dx-table-group-row />
        <dx-table-column-visibility
          :hiddenColumnNames.sync="hiddenColumnNames"
        />
        <dx-toolbar />
        <dx-grouping-panel
          showSortingControls
          showGroupingControls
        />
        <dx-paging-panel
          :pageSizes="pageSizes"
        />
        <dx-column-chooser />
      </dx-grid>
    </div>
  `,
  components: {
    DxFilteringState,
    DxSortingState,
    DxGroupingState,
    DxPagingState,
    DxSelectionState,
    DxIntegratedFiltering,
    DxIntegratedSorting,
    DxIntegratedGrouping,
    DxIntegratedPaging,
    DxIntegratedSelection,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableFilterRow,
    DxTableGroupRow,
    DxTableSelection,
    DxPagingPanel,
    DxToolbar,
    DxGroupingPanel,
    DxColumnChooser,
    DxTableColumnVisibility,
    MyCell,
    CurrencyTypeProvider,
    PercentTypeProvider,
  },
};
