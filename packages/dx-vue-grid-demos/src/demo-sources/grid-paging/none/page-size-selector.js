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
      rows: generateRows({ length: 60 }),
      pageSize: 5,
      currentPage: 0,
      pageSizes: [5, 10, 15, 0],
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
          :pageSize.sync="pageSize"
        />
        <dx-integrated-paging />
        <dx-table />
        <dx-table-header-row />
        <dx-paging-panel
          :pageSizes.sync="pageSizes"
        />
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
