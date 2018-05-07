import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'channel', title: 'Channel' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
      tableColumnExtensions: [
        { columnName: 'sector', align: 'center' },
        { columnName: 'channel', align: 'center' },
        { columnName: 'amount', align: 'right' },
      ],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
