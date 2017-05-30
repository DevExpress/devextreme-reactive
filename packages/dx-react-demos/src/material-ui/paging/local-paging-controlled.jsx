import React from 'react';
import {
  Grid,
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-grid';
import {
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

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
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          currentPage={this.state.currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={5}
        />
        <LocalPaging />
        <TableView />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    );
  }
}
