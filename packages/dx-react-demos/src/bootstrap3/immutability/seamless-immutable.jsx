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
  generateData,
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
    const data = generateData({ length: 14 });
    this.state = {
      data: Immutable({
        columns,
        data,
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
    const { data, columns, sorting, selection } = this.state.data;

    return (
      <Grid
        data={data}
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
