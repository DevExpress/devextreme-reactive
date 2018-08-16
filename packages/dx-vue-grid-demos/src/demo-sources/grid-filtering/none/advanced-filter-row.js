import {
  DxDataTypeProvider,
  DxFilteringState,
  DxIntegratedFiltering,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableFilterRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const MyDateFilterCell = {
  template: `
    <span class="d-block oi oi-calendar" />
  `,
};

const FilterIcon = {
  props: ['type'],
  computed: {
    componentId() {
      return this.type === 'month' ? 'my-date-filter-cell' : 'dx-icon';
    },
  },
  template: `
    <component
      :is="componentId"
      v-bind="$attrs"
      v-on="$listeners"
      :type="type"
    />
  `,
  components: {
    DxIcon: DxTableFilterRow.components.DxIcon,
    MyDateFilterCell,
  },
};

const CurrencyFormatter = {
  props: ['value'],
  template: `
    <b style="color: darkblue">\${{ value }}</b>
  `,
};

const CurrencyTypeProvider = {
  template: `
    <dx-data-type-provider
      :formatterComponent="$options.components.CurrencyFormatter"
      :availableFilterOperations="$attrs.availableFilterOperations"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    CurrencyFormatter,
  },
};

const DateFormatter = {
  props: ['value'],
  template: `
    <span>{{ value.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, '$3.$2.$1') }}</span>
  `,
};

const DateTypeProvider = {
  template: `
    <dx-data-type-provider
      :formatterComponent="$options.components.DateFormatter"
      :availableFilterOperations="$attrs.availableFilterOperations"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    DateFormatter,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      filters: [],
      dateColumns: ['saleDate'],
      currencyColumns: ['amount'],
      dateFilterOperations: ['month', 'contains', 'startsWith', 'endsWith'],
      currencyFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
      filteringColumnExtensions: [
        {
          columnName: 'saleDate',
          predicate: (value, filter, row) => {
            if (!filter.value.length) return true;
            if (filter && filter.operation === 'month') {
              const month = parseInt(value.split('-')[1], 10);
              return month === parseInt(filter.value, 10);
            }
            return DxIntegratedFiltering.defaultPredicate(value, filter, row);
          },
        },
      ],
      filterMessages: { month: 'Month equals' },
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <currency-type-provider
          :for="currencyColumns"
          :availableFilterOperations="currencyFilterOperations"
        />

        <date-type-provider
          :for="dateColumns"
          :availableFilterOperations="dateFilterOperations"
        />
        <dx-filtering-state
          :filters.sync="filters"
        />
        <dx-integrated-filtering
          :columnExtensions="filteringColumnExtensions"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-filter-row
          showFilterSelector
          :iconComponent="$options.components.FilterIcon"
          :messages="filterMessages"
        />
        <dx-table-header-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    CurrencyTypeProvider,
    DateTypeProvider,
    DxFilteringState,
    DxIntegratedFiltering,
    DxTableFilterRow,
    FilterIcon,
  },
};
