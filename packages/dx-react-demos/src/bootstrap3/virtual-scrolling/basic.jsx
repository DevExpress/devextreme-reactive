import React from 'react';
import {
    DataGrid,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    VirtualTableView,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class BasicDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(100000),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <VirtualTableView />
        <TableHeaderRow />
      </DataGrid>
    );
  }
}
