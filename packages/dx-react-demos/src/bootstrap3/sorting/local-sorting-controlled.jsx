import React from 'react';
import {
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
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
      sorting: [{ columnName: 'city', direction: 'asc' }],
    };

    this.changeSorting = sorting => this.setState({ sorting });
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <SortingState
          sorting={this.state.sorting}
          onSortingChange={this.changeSorting}
        />
        <LocalSorting />
        <TableView />
        <TableHeaderRow allowSorting />
      </Grid>
    );
  }
}
