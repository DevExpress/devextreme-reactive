import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  employeeTaskValues,
} from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        { name: 'subject', title: 'Subject (with enabled word wrap)' },
        { name: 'startDate', title: 'Start Date' },
        { name: 'dueDate', title: 'Due Date' },
        { name: 'priority', title: 'Priority' },
        { name: 'status', title: 'Status' },
      ],
      rows: generateRows({ columnValues: employeeTaskValues, length: 8 }),
      tableColumnExtensions: [
        { columnName: 'subject', wordWrapEnabled: true },
      ],
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
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
