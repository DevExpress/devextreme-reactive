import { RowDetailState as DxRowDetailState } from '@devexpress/dx-vue-grid';
import {
  Grid as DxGrid,
  Table as DxTable,
  TableHeaderRow as DxTableHeaderRow,
  TableRowDetail as DxTableRowDetail,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

// const RowDetail = ({ row }) => (
//   <div>Details for {row.name} from {row.city}</div>
// );

const RowDetail = {
  name: 'RowDetail',
  template: `
    <div>123</div>
  `,
};

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
      expandedRowIds: [2, 5],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-row-detail-state
          :expandedRowIds.sync="expandedRowIds"
        />
        <dx-table />
        <dx-table-header-row />
        <dx-table-row-detail />
      </dx-grid>
    </div>
  `,
  components: {
    DxRowDetailState,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableRowDetail,
    RowDetail,
  },
};
