import {
  DxSortingState,
  DxIntegratedSorting,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
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
      rows: generateRows({ length: 8 }),
      sorting: [
        { columnName: 'sex', direction: 'desc' },
      ],
      sortingStateColumnExtensions: [
        { columnName: 'sex', sortingEnabled: false },
      ],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-sorting-state
          :sorting.sync="sorting"
          :columnExtensions="sortingStateColumnExtensions"
        />
        <dx-integrated-sorting />
        <dx-table />
        <dx-table-header-row
          showSortingControls
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxSortingState,
    DxIntegratedSorting,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
