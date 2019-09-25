import {
  DxGroupingState,
  DxIntegratedGrouping,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableGroupRow,
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
      grouping: [{ columnName: 'city' }],
      integratedGroupingColumnExtensions: [
        { columnName: 'city', criteria: this.cityGroupCriteria },
      ],
      tableGroupColumnExtension: [
        { columnName: 'city', showWhenGrouped: true },
      ],
      rows: generateRows({ length: 8 }),
      expandedGroups: [],
    };
  },
  methods: {
    cityGroupCriteria(value) {
      return ({ key: value.substr(0, 1) });
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-grouping-state
          :grouping="grouping"
          :expandedGroups.sync="expandedGroups"
        />
        <dx-integrated-grouping
          :columnExtensions="integratedGroupingColumnExtensions"
        />
        <dx-table />
        <dx-table-header-row />
        <dx-table-group-row
          :columnExtensions="tableGroupColumnExtension"
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxGroupingState,
    DxIntegratedGrouping,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableGroupRow,
  },
};
