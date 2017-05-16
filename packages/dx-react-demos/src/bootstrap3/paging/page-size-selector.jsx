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
} from '@devexpress/dx-react-grid-bootstrap3';

import { generateRows } from '../../demoData';

export class PageSizeSelectorDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 50 }),
    };
  }

  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={8}
          pageSizes={[4, 8, 12]}
        />
        <LocalPaging />
        <TableView />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    );
  }
}
