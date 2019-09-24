import {
  DxGroupingState,
  DxCustomGrouping,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableGroupRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows, defaultColumnValues } from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      grouping: [{ columnName: 'gender' }],
      expandedGroups: [],
      data: [{
        key: 'Male',
        items: generateRows({
          columnValues: { ...defaultColumnValues, gender: ['Male'] },
          length: 5,
        }),
      }, {
        key: 'Female',
        items: generateRows({
          columnValues: { ...defaultColumnValues, gender: ['Female'] },
          length: 5,
        }),
      }],
      rows: generateRows({ length: 8 }),
    };
  },
  methods: {
    getChildGroups(groups) {
      return groups.map(group => ({ key: group.key, childRows: group.items }));
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="data"
        :columns="columns"
      >
        <dx-grouping-state
          :grouping="grouping"
          :expandedGroups.sync="expandedGroups"
        />
        <dx-custom-grouping
          :getChildGroups="getChildGroups"
        />
        <dx-table />
        <dx-table-header-row />
        <dx-table-group-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxGroupingState,
    DxCustomGrouping,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableGroupRow,
  },
};
