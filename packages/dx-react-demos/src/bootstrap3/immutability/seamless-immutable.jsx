import React from 'react';
import {
  SortingState,
  SelectionState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap3';

import Immutable from 'seamless-immutable';

import {
  generateRows,
} from '../../demoData';

export class SeamlessImmutableDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    const columns = [
      { name: 'name', title: 'Name' },
      { name: 'sex', title: 'Sex' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ];
    const rows = generateRows({ length: 14 });
    this.state = Immutable({
      columns,
      rows,
      sorting: [],
      selection: [],
    });

    this.changeSorting = (sorting) => {
      this.setState({ sorting: Immutable(sorting) });
    };

    this.changeSelection = (selection) => {
      this.setState({ selection: Immutable(selection) });
    };
  }
  render() {
    const { rows, columns, sorting, selection } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          sorting={sorting}
          onSortingChange={this.changeSorting}
        />
        <LocalSorting />
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <TableView />
        <TableHeaderRow allowSorting />
        <TableSelection />
      </Grid>
    );
  }
}
