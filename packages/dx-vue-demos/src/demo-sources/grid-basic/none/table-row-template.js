import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const MyRow = {
  inheritAttrs: false,
  props: ['row'],
  created() {
    this.styles = {
      banking: {
        backgroundColor: '#f5f5f5',
      },
      health: {
        backgroundColor: '#a2e2a4',
      },
      telecom: {
        backgroundColor: '#b3e5fc',
      },
      energy: {
        backgroundColor: '#ffcdd2',
      },
      insurance: {
        backgroundColor: '#f0f4c3',
      },
    };
  },
  methods: {
    handleClick() {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(this.row));
    },
  },
  template: `
    <dx-row
      v-bind="$attrs"
      v-on="$listeners"
      :row="row"
      :style="{
        cursor: 'pointer',
        ...styles[row.sector.toLowerCase()],
      }"
      @click="handleClick"
    >
      <slot />
    </dx-row>
  `,
  components: {
    DxRow: DxTable.components.DxRow,
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
          :rowComponent="$options.components.MyRow"
        />
        <dx-table-header-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    MyRow,
  },
};
