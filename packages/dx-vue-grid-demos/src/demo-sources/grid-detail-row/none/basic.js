import { DxRowDetailState } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableRowDetail,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

const RowDetail = {
  props: ['row'],
  template: `
    <div>Details for {{ row.name }} from {{ row.city }}</div>
  `,
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
        <dx-table-row-detail
          :contentComponent="$options.components.RowDetail"
        />
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
