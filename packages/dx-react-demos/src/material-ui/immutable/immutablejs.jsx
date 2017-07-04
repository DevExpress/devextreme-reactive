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

    this.state = {
      data: Map({
        columns,
        rows,
        sorting: List([]),
        selection: List([]),
      }),
    };

    this.changeSorting = (sorting) => {
      this.setState(({ data }) => ({
        data: data.update('sorting', () => List(sorting)),
      }));
    };

    this.changeSelection = (selection) => {
      this.setState(({ data }) => ({
        data: data.update('selection', () => List(selection)),
      }));
    };
  }
  render() {
    const data = this.state.data;

    return (
      <Grid
        rows={data.get('rows').toJS()}
        columns={data.get('columns').toJS()}
      >
        <SortingState
          sorting={data.get('sorting').toJS()}
          onSortingChange={this.changeSorting}
        />
        <LocalSorting />
        <SelectionState
          selection={data.get('selection').toJS()}
          onSelectionChange={this.changeSelection}
        />
        <TableView />
        <TableHeaderRow allowSorting />
        <TableSelection />
      </Grid>
    );
  }
}
