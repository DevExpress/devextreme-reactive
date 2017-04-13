import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalPagingDemo extends React.PureComponent {
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
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <LocalPaging />
        <TableView />
        <TableHeaderRow />
        <PagingPanel />
      </DataGrid>
    );
  }
}
