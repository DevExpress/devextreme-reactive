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
  generateRows,
} from '../../demoData';

export class LocalPagingControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'sex', title: 'Sex' },
        { name: 'name', title: 'Name' },
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
