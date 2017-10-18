import React from 'react';
import {
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
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
      pageSize: 5,
      allowedPageSizes: [5, 10, 15],
    };

    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
  }
  render() {
    const {
      rows, columns, pageSize, allowedPageSizes,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          currentPage={this.state.currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}
        />
        <LocalPaging />
        <TableView />
        <TableHeaderRow />
        <PagingPanel
          allowedPageSizes={allowedPageSizes}
        />
      </Grid>
    );
  }
}
