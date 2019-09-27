import {
  DxSortingState,
  DxGroupingState,
  DxIntegratedSorting,
  DxIntegratedGrouping,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableGroupRow,
  DxGroupingPanel,
  DxToolbar,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      sorting: [
        { columnName: 'city', direction: 'asc' },
        { columnName: 'name', direction: 'desc' },
      ],
      grouping: [{ columnName: 'city' }],
      expandedGroups: [],
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
        <dx-sorting-state
          :sorting.sync="sorting"
        />
        <dx-grouping-state
          :grouping.sync="grouping"
          :expandedGroups.sync="expandedGroups"
        />
        <dx-integrated-sorting />
        <dx-integrated-grouping />
        <dx-table />
        <dx-table-header-row
          showSortingControls
        />
        <dx-table-group-row />
        <dx-toolbar />
        <dx-grouping-panel
          showSortingControls
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxSortingState,
    DxGroupingState,
    DxIntegratedSorting,
    DxIntegratedGrouping,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableGroupRow,
    DxGroupingPanel,
    DxToolbar,
  },
};
