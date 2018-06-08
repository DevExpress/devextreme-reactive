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
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      tableColumnExtensions: [
        { columnName: 'sex', width: 100 },
      ],
      rows: generateRows({ length: 6 }),
      hiddenColumnNames: ['sex', 'car'],
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
