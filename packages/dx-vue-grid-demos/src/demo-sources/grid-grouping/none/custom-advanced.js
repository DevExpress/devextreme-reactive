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

const MyNameGroupCell = {
  inheritAttrs: false,
  template: `
    <dx-cell
      v-bind="$attrs"
      v-on="$listeners"
    >
      from {{$attrs.row.value.from}} to {{$attrs.row.value.to}}
    </dx-cell>
  `,
  components: {
    DxCell: DxTableGroupRow.components.DxCell,
  },
};

const MyGroupCell = {
  inheritAttrs: false,
  data() {
    return {
      componentId: this.$attrs.column.name === 'name' ? 'my-name-group-cell' : 'dx-cell',
    };
  },
  template: `
    <component
      :is="componentId"
      v-bind="$attrs"
      v-on="$listeners"
    />
  `,
  components: {
    DxCell: DxTableGroupRow.components.DxCell,
    MyNameGroupCell,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      grouping: [{ columnName: 'name' }],
      integratedGroupingColumnExtensions: [
        { columnName: 'name', criteria: this.nameGroupCriteria },
      ],
      tableGroupColumnExtension: [
        { columnName: 'name', showWhenGrouped: true },
      ],
      rows: generateRows({ length: 8 }),
      expandedGroups: [],
    };
  },
  methods: {
    nameGroupCriteria(value) {
      const firstLetter = String(value).substr(0, 1).toLowerCase();
      const groupValue = firstLetter < 'n'
        ? { from: 'A', to: 'M' }
        : { from: 'N', to: 'Z' };
      return {
        value: groupValue,
        key: `${groupValue.from}-${groupValue.to}`,
      };
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
          :cellComponent="$options.components.MyGroupCell"
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
    MyGroupCell,
  },
};
