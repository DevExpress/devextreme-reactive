import {
  DxPagingState,
  DxIntegratedPaging,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxPagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      sorting: [],
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 8 }),
      currentPage: 0,
      pageSize: 5,
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-paging-state
          :currentPage.sync="currentPage"
          :pageSize="pageSize"
        />
        <dx-integrated-paging />
        <dx-table />
        <dx-table-header-row />
        <dx-paging-panel />
      </dx-grid>
    </div>
  `,
  components: {
    DxPagingState,
    DxIntegratedPaging,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxPagingPanel,
  },
};
