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

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      filters: [{ columnName: 'car', value: 'cruze' }],
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'car', title: 'Car' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
      ],
      filteringStateColumnExtensions: [
        { columnName: 'name', filteringEnabled: false },
        { columnName: 'car', filteringEnabled: false },
      ],
      rows: generateRows({ length: 8 }),
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
          :columnExtensions="filteringStateColumnExtensions"
        />
        <dx-integrated-filtering />
        <dx-table />
        <dx-table-header-row />
        <dx-table-filter-row />
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
  },
};
