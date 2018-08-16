import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  defaultNestedColumnValues,
} from '../../../demo-data/generator';

export default {
  data() {
    return {
      columns: [
        {
          name: 'firstName',
          title: 'First Name',
          getCellValue: row => (row.user ? row.user.firstName : undefined),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          getCellValue: row => (row.user ? row.user.lastName : undefined),
        },
        {
          name: 'car',
          title: 'Car',
          getCellValue: row => (row.car ? row.car.model : undefined),
        },
        { name: 'position', title: 'Position' },
        { name: 'city', title: 'City' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
        length: 8,
      }),
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
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
