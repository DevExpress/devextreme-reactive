import React from 'react';
import {
  DataGrid,
  SortingState,
  GroupingState,
  LocalSorting,
  LocalGrouping,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  GroupingPanelSorting,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalGroupSortingDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSortings={[
            { column: 'city', direction: 'asc' },
            { column: 'name', direction: 'desc' },
          ]}
        />
        <GroupingState
          defaultGrouping={[{ column: 'city' }]}
        />
        <LocalSorting />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow />
        <TableGroupRow />
        <GroupingPanel />
        <GroupingPanelSorting />
      </DataGrid>
    );
  }
}
