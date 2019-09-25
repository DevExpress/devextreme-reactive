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
      filters: [],
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
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
