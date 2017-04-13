import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableGroupRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalGroupingStaticDemo extends React.PureComponent {
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
        <GroupingState
          grouping={[{ column: 'city' }]}
        />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow />
        <TableGroupRow />
      </DataGrid>
    );
  }
}
