import React from 'react';
import {
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateData,
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
      data: generateData({ length: 14 }),
    };
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
        <LocalFiltering />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    );
  }
}
