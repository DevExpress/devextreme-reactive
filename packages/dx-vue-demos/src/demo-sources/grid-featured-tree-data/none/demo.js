import {
  DxDataTypeProvider,
  DxTreeDataState,
  DxSortingState,
  DxSelectionState,
  DxFilteringState,
  DxPagingState,
  DxCustomTreeData,
  DxIntegratedFiltering,
  DxIntegratedPaging,
  DxIntegratedSorting,
  DxIntegratedSelection,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableFilterRow,
  DxTableTreeColumn,
  DxPagingPanel,
  DxTableColumnVisibility,
  DxToolbar,
  DxColumnChooser,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { tasks, employees, priorities } from '../data.json';

const MyEmployeeFormatter = {
  props: { row: { required: true } },
  created() {
    this.employees = employees;
  },
  template: `
    <div
      style="display: flex;"
    >
      <div
        style="
          display: inline-block;
          background: white;
          border-radius: 3px;
          width: 30px;
          height: 30px;
          margin: -8px 8px -8px 0;
          text-align: center;
        "
      >
        <img
          :src="\`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/\${employees.find(e => e.ID === row.Assigned_Employee_ID).Picture}\`"
          style="
            height: 28px;
            margin: 0 auto;
          "
          alt="Avatar"
        />
      </div>
      {{employees.find(e => e.ID === row.Assigned_Employee_ID).Name}}
    </div>
  `,
};

export default {
  created() {
    this.getChildRows = (row, rows) => {
      const childRows = rows.filter(r => r.Parent_ID === (row ? row.ID : 0));
      return childRows.length ? childRows : null;
    };
  },
  data() {
    return {
      columns: [
        { name: 'Subject', title: 'Task Subject' },
        { name: 'Assigned_Employee_ID', title: 'Assigned', getCellValue: row => employees.find(e => e.ID === row.Assigned_Employee_ID).Name },
        { name: 'Status', title: 'Status' },
        { name: 'Priority', title: 'Priority', getCellValue: row => priorities.find(p => p.ID === row.Priority).Value },
        { name: 'Completion', title: '% Completed', getCellValue: row => `${row.Completion}%` },
        { name: 'Start_Date', title: 'Start Date', getCellValue: row => row.Start_Date.split('T')[0] },
        { name: 'Due_Date', title: 'Due Date', getCellValue: row => row.Due_Date.split('T')[0] },
      ],
      rows: tasks,
      expandedRowIds: [],
      filters: [],
      sorting: [],
      selection: [],
      currentPage: 0,
      pageSize: 10,
      pageSizes: [5, 10, 20],
      tableColumnExtensions: [
        { columnName: 'Subject', width: 300 },
        { columnName: 'Assigned_Employee_ID', width: 180 },
        { columnName: 'Status', width: 120 },
        { columnName: 'Priority', width: 100 },
        { columnName: 'Completion', width: 100, align: 'right' },
        { columnName: 'Start_Date', width: 120 },
        { columnName: 'Due_Date', width: 120 },
      ],
      employeeColumns: ['Assigned_Employee_ID'],
      hiddenColumnNames: ['Priority', 'Completion'],
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-data-type-provider
          :for="employeeColumns"
          :formatterComponent="$options.components.MyEmployeeFormatter"
        />

        <dx-tree-data-state
          :expandedRowIds.sync="expandedRowIds"
        />
        <dx-filtering-state
          :filters.sync="filters"
        />
        <dx-sorting-state
          :sorting.sync="sorting"
        />
        <dx-selection-state
          :selection.sync="selection"
        />
        <dx-paging-state
          :currentPage.sync="currentPage"
          :pageSize.sync="pageSize"
        />

        <dx-custom-tree-data
          :getChildRows="getChildRows"
        />
        <dx-integrated-filtering />
        <dx-integrated-selection />
        <dx-integrated-sorting />
        <dx-integrated-paging />

        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row
          showSortingControls
        />
        <dx-table-filter-row />
        <dx-table-tree-column
          for="Subject"
          showSelectionControls
          showSelectAll
        />
        <dx-table-column-visibility
          :hiddenColumnNames.sync="hiddenColumnNames"
        />
        <dx-paging-panel
          :pageSizes="pageSizes"
        />
        <dx-toolbar />
        <dx-column-chooser />
      </dx-grid>
    </div>
  `,
  components: {
    DxDataTypeProvider,
    DxTreeDataState,
    DxSortingState,
    DxSelectionState,
    DxFilteringState,
    DxPagingState,
    DxCustomTreeData,
    DxIntegratedFiltering,
    DxIntegratedPaging,
    DxIntegratedSorting,
    DxIntegratedSelection,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableFilterRow,
    DxTableTreeColumn,
    DxPagingPanel,
    DxTableColumnVisibility,
    DxToolbar,
    DxColumnChooser,
    MyEmployeeFormatter,
  },
};
