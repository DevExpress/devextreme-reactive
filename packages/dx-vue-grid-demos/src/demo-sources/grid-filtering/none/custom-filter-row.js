import {
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

const MyUnitsFilterCell = {
  inheritAttrs: false,
  props: ['filter'],
  template: `
    <th
      v-bind="$attrs"
      v-on="$listeners"
    >
      <input
        type="number"
        class="form-control text-right"
        :value="filter ? filter.value : ''"
        min="1"
        max="4"
        placeholder="Filter..."
        @change="e => this.$emit('filter', e.target.value ? { value: e.target.value } : null)"
      />
    </th>
  `,
};

const MyFilterCell = {
  inheritAttrs: false,
  props: ['column', 'getMessage'],
  data() {
    return {
      componentId: this.column.name === 'units' ? 'my-units-filter-cell' : 'dx-cell',
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
    DxCell: DxTableFilterRow.components.DxCell,
    MyUnitsFilterCell,
  },
};

export default {
  data() {
    return {
      filters: [],
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'units', title: 'Quantity' },
      ],
      tableColumnExtensions: [
        { columnName: 'units', align: 'right' },
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
        <dx-filtering-state
          :filters.sync="filters"
        />
        <dx-integrated-filtering />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
        <dx-table-filter-row
          :cellComponent="$options.components.MyFilterCell"
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxFilteringState,
    DxIntegratedFiltering,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableFilterRow,
    MyFilterCell,
  },
};
