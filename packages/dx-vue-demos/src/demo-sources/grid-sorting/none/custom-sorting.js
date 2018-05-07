import {
  DxSortingState,
  DxIntegratedSorting,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  employeeTaskValues,
} from '../../../demo-data/generator';

const priorityWeights = {
  Low: 0,
  Normal: 1,
  High: 2,
};

const comparePriority = (a, b) => {
  const priorityA = priorityWeights[a];
  const priorityB = priorityWeights[b];
  if (priorityA === priorityB) {
    return 0;
  }
  return (priorityA < priorityB) ? -1 : 1;
};

export default {
  data() {
    return {
      sorting: [],
      columns: [
        { name: 'subject', title: 'Subject' },
        { name: 'startDate', title: 'Start Date' },
        { name: 'dueDate', title: 'Due Date' },
        { name: 'priority', title: 'Priority' },
      ],
      integratedSortingColumnExtensions: [
        { columnName: 'priority', compare: comparePriority },
      ],
      tableColumnExtensions: [
        { columnName: 'subject', width: 300 },
      ],
      rows: generateRows({
        columnValues: employeeTaskValues,
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
        <dx-sorting-state
          :sorting.sync="sorting"
        />
        <dx-integrated-sorting
          :columnExtensions="integratedSortingColumnExtensions"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row
          showSortingControls
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxSortingState,
    DxIntegratedSorting,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
