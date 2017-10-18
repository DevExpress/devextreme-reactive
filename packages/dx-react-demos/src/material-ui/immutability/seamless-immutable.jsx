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
} from '@devexpress/dx-react-grid-material-ui';

import Immutable from 'seamless-immutable';

import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    const columns = [
      { name: 'name', title: 'Name' },
      { name: 'sex', title: 'Sex' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ];
    const rows = generateRows({ length: 14 });
    this.state = {
      data: Immutable({
        columns,
        rows,
        sorting: [],
        selection: [],
      }),
    };

    this.changeSorting = (sorting) => {
      this.setState({
        data: this.state.data.setIn(['sorting'], sorting),
      });
    };

    this.changeSelection = (selection) => {
      this.setState({
        data: this.state.data.setIn(['selection'], selection),
      });
    };
  }
  render() {
    const {
      rows, columns, sorting, selection,
    } = this.state.data;

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
