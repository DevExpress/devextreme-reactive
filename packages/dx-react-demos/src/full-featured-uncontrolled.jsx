import React from 'react';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState, PagingState, GroupingState,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableRowDetail, TableHeaderRowSorting, TableHeaderRowGrouping,
    TableFilterRow, TableColumnSelection, PagingPanel, GroupingPanel, TableGroupRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import { generateColumns, generateRows } from './demoData';

export class FullFeaturedUncontrolledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(105),
    };

    this.rowTemplate = ({ row }) => <div>Detail for {row.name} from {row.city}</div>;
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <h2>Full Featured Uncontrolled Demo</h2>

        <DataGrid
          rows={rows}
          columns={columns}
        >

          <SortingState
            defaultSortings={[{ column: 'name', direction: 'asc' }]}
          />

          <FilteringState
            defaultFilters={[{ column: 'name', value: 'j' }]}
          />


          <GroupingState
            defaultGrouping={[{ column: 'sex' }]}
            defaultExpandedGroups={{ Female: true }}
          />

          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />

          <SelectionState
            defaultSelection={[1, 3, 18]}
          />

          <TableView />

          <TableHeaderRow />
          <TableHeaderRowSorting />
          <TableHeaderRowGrouping />

          <TableFilterRow />

          <PagingPanel />

          <TableColumnSelection />

          <TableRowDetail
            defaultExpandedDetails={[3]}
            template={this.rowTemplate}
          />

          <TableGroupRow />

          <GroupingPanel />

        </DataGrid>
      </div>
    );
  }
}
