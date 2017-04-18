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
  TableHeaderRowGrouping,
  GroupingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalGroupingWithUIDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows({ length: 14 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <GroupingState defaultGrouping={[{ column: 'city' }]} />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow />
        <TableHeaderRowGrouping />
        <TableGroupRow />
        <GroupingPanel />
      </DataGrid>
    );
  }
}
