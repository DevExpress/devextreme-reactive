import React from 'react';
import {
  DataGrid,
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class LocalPagingControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
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
          currentPage={this.state.currentPage}
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
