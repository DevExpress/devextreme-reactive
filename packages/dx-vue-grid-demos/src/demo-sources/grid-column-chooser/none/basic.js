import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxColumnChooser,
  DxTableColumnVisibility,
  DxToolbar,
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
      tableColumnExtensions: [
        { columnName: 'gender', width: 100 },
      ],
      rows: generateRows({ length: 6 }),
      hiddenColumnNames: ['gender', 'car'],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row />
        <dx-table-column-visibility
          :hiddenColumnNames.sync="hiddenColumnNames"
        />
        <dx-toolbar />
        <dx-column-chooser />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxColumnChooser,
    DxTableColumnVisibility,
    DxToolbar,
  },
};
