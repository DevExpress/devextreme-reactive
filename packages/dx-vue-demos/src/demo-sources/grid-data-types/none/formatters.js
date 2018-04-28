import { DxDataTypeProvider } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

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
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      dateColumns: ['saleDate'],
      currencyColumns: ['amount'],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
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
        />
        <date-type-provider
          :for="dateColumns"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxDataTypeProvider,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    CurrencyTypeProvider,
    DateTypeProvider,
  },
};
