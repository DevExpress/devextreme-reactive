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
      rows: generateRows({ length: 6 }),
      hiddenColumnNames: ['gender', 'car'],
      tableColumnVisibilityColumnExtensions: [
        { columnName: 'city', togglingEnabled: false },
      ],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-table />
        <dx-table-header-row />
        <dx-table-column-visibility
          :hiddenColumnNames.sync="hiddenColumnNames"
          :columnExtensions="tableColumnVisibilityColumnExtensions"
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
