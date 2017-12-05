import React from 'react';
import {
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demo-data/generator';

import SortingStateContainer from './containers/sorting-state-container';
import SelectionStateContainer from './containers/selection-state-container';

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
      columns,
      rows,
      sorting: [],
      selection: [],
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const {
      rows, columns, sorting, selection,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingStateContainer
          sorting={sorting}
          onSortingChange={this.changeSorting}
        />
        <LocalSorting />
        <SelectionStateContainer
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <Table />
        <TableHeaderRow allowSorting />
        <TableSelection />
      </Grid>
    );
  }
}
