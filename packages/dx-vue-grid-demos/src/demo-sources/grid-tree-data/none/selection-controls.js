import {
  DxSelectionState,
  DxTreeDataState,
  DxCustomTreeData,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableTreeColumn,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  defaultColumnValues,
} from '../../../demo-data/generator';

export default {
  created() {
    this.getChildRows = (row, rootRows) => {
      const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
      return childRows.length ? childRows : null;
    };
  },
  data() {
    return {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      tableColumnExtensions: [
        { columnName: 'name', width: 300 },
      ],
      selection: [],
      expandedRowIds: [0],
      data: generateRows({
        columnValues: {
          id: ({ index }) => index,
          parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
          ...defaultColumnValues,
        },
        length: 20,
      }),
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="data"
        :columns="columns"
      >
        <dx-selection-state
          :selection.sync="selection"
        />
        <dx-tree-data-state
          :expandedRowIds.sync="expandedRowIds"
        />
        <dx-custom-tree-data
          :getChildRows="getChildRows"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
        <dx-table-tree-column
          for="name"
          showSelectionControls
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxSelectionState,
    DxTreeDataState,
    DxCustomTreeData,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableTreeColumn,
  },
};
