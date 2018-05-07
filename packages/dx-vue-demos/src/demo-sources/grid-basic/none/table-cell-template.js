import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const MyHighlightedCell = {
  inheritAttrs: false,
  props: ['value'],
  template: `
    <dx-cell
      :style="{ backgroundColor: value < 5000 ? 'red' : undefined }"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <span
        :style="{ color: value < 5000 ? 'white' : undefined }"
      >
        {{value}}
      </span>
    </dx-cell>
  `,
  components: {
    DxCell: DxTable.components.DxCell,
  },
};

const MyCell = {
  inheritAttrs: false,
  props: ['column'],
  data() {
    return {
      componentId: this.column.name === 'amount' ? 'my-highlighted-cell' : 'dx-cell',
    };
  },
  template: `
    <component
      :is="componentId"
      :column="column"
      v-bind="$attrs"
      v-on="$listeners"
    />
  `,
  components: {
    DxCell: DxTable.components.DxCell,
    MyHighlightedCell,
  },
};

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
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-table
          :cellComponent="$options.components.MyCell"
        />
        <dx-table-header-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    MyCell,
  },
};
