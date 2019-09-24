import {
  DxSearchState,
  DxIntegratedFiltering,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxToolbar,
  DxSearchPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 6 }),
      searchValue: 'Paris',
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-search-state
          :value.sync="searchValue"
        />
        <dx-integrated-filtering />
        <dx-table />
        <dx-table-header-row />
        <dx-toolbar />
        <dx-search-panel />
      </dx-grid>
    </div>
  `,
  components: {
    DxSearchState,
    DxIntegratedFiltering,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxToolbar,
    DxSearchPanel,
  },
};
