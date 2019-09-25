import {
  DxSelectionState,
  DxIntegratedSelection,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
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
      rows: generateRows({ length: 8 }),
      selection: [1],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-selection-state
          :selection.sync="selection"
        />
        <dx-integrated-selection />
        <dx-table />
        <dx-table-header-row />
        <dx-table-selection />
      </dx-grid>
    </div>
  `,
  components: {
    DxSelectionState,
    DxIntegratedSelection,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableSelection,
  },
};
