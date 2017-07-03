import React from 'react';
import {
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import { Map, List } from 'immutable';

import {
  generateRows,
} from '../../demoData';

export class ImmutableJSDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    const columns = List([
      { name: 'name', title: 'Name' },
      { name: 'sex', title: 'Sex' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ]);
    const rows = List(generateRows({ length: 14 }));

    const state = Map({
      columns,
      rows,
    });

    this.state = state.toJS();
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState />
        <LocalSorting />
        <TableView />
        <TableHeaderRow allowSorting />
      </Grid>
    );
  }
}
