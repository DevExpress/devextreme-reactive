import {
  SearchState as DxSearchState,
  IntegratedFiltering as DxIntegratedFiltering,
} from '@devexpress/dx-vue-grid';
import {
  Grid as DxGrid,
  Table as DxTable,
  TableHeaderRow as DxTableHeaderRow,
  Toolbar as DxToolbar,
  SearchPanel as DxSearchPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
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
