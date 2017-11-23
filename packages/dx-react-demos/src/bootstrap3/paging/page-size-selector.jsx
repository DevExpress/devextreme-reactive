import React from 'react';
import {
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TablePlugin,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';

import { generateRows } from '../../demo-data/generator';

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
      rows: generateRows({ length: 60 }),
      allowedPageSizes: [5, 10, 15, 0],
    };
  }

  render() {
    const { rows, columns, allowedPageSizes } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <LocalPaging />
        <TablePlugin />
        <TableHeaderRow />
        <PagingPanel
          allowedPageSizes={allowedPageSizes}
        />
      </Grid>
    );
  }
}
