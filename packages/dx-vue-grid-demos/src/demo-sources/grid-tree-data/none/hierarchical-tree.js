import {
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
    this.getChildRows = (row, rootRows) => (row ? row.items : rootRows);
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
      expandedRowIds: [],
      data: generateRows({
        columnValues: {
          ...defaultColumnValues,
          items: ({ random }) => (random() > 0.5
            ? generateRows({
              columnValues: {
                ...defaultColumnValues,
                items: () => (random() > 0.5
                  ? generateRows({
                    columnValues: {
                      ...defaultColumnValues,
                    },
                    length: Math.trunc(random() * 5) + 1,
                    random,
                  })
                  : null),
              },
              length: Math.trunc(random() * 3) + 1,
              random,
            })
            : null),
        },
        length: 3,
      }),
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="data"
        :columns="columns"
      >
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
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxTreeDataState,
    DxCustomTreeData,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableTreeColumn,
  },
};
