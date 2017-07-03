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

import Immutable from 'seamless-immutable';

import {
  generateRows,
} from '../../demoData';

export class SeamlessImmutableDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    const columns = Immutable([
      { name: 'name', title: 'Name' },
      { name: 'sex', title: 'Sex' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ]);
    const rows = Immutable(generateRows({ length: 14 }));

    this.state = Immutable({
      columns,
      rows,
    });
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
