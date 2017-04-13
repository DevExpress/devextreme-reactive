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

export class LocalPagingControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
      currentPage: 0,
    };

    this.changeCurrentPage = currentPage => this.setState({ currentPage });
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <PagingState
          currectPage={this.state.currentPage}
          currentPageChange={this.changeCurrentPage}
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
