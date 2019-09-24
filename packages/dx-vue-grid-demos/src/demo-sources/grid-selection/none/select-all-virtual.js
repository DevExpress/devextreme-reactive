import {
  DxSelectionState,
  DxIntegratedSelection,
  DxIntegratedPaging,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxVirtualTable,
  DxTableHeaderRow,
  DxTableSelection,
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
      rows: generateRows({ length: 1000 }),
      selection: [],
    };
  },
  template: `
    <div>
      <span>Total rows selected: {{ selection.length }}</span>
      <div class="card">
        <dx-grid
          :rows="rows"
          :columns="columns"
        >
          <dx-selection-state
            :selection.sync="selection"
          />
          <dx-integrated-selection />
          <dx-virtual-table />
          <dx-table-header-row />
          <dx-table-selection
            showSelectAll
          />
        </dx-grid>
      </div>
    </div>
  `,
  components: {
    DxSelectionState,
    DxIntegratedSelection,
    DxIntegratedPaging,
    DxGrid,
    DxVirtualTable,
    DxTableHeaderRow,
    DxTableSelection,
  },
};
