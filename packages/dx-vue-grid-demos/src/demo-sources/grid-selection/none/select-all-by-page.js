import {
  DxSelectionState,
  DxIntegratedSelection,
  DxPagingState,
  DxIntegratedPaging,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxPagingPanel,
  DxTableHeaderRow,
  DxTableSelection,
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
      rows: generateRows({ length: 8 }),
      selection: [1],
      currentPage: 0,
      pageSize: 6,
    };
  },
  template: `
    <div>
      <span>Total rows selected: {{ selection.length }}</span>
      <div class="card">
        <dx-grid
          :rows="rows"
          :columns="columns"
        >
          <dx-selection-state
            :selection.sync="selection"
          />
          <dx-paging-state
            :currentPage.sync="currentPage"
            :pageSize="pageSize"
          />
          <dx-integrated-paging />
          <dx-integrated-selection />
          <dx-table />
          <dx-table-header-row />
          <dx-table-selection
            showSelectAll
          />
          <dx-paging-panel />
        </dx-grid>
      </div>
    </div>
  `,
  components: {
    DxPagingState,
    DxSelectionState,
    DxIntegratedSelection,
    DxIntegratedPaging,
    DxGrid,
    DxTable,
    DxPagingPanel,
    DxTableHeaderRow,
    DxTableSelection,
  },
};
