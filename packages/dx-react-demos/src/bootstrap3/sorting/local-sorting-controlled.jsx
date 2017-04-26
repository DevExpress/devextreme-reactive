import React from 'react';
import {
  DataGrid,
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class LocalSortingControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
      sortings: [{ column: 'city', direction: 'asc' }],
    };

    this.changeSortings = sortings => this.setState({ sortings });
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <SortingState
          sortings={this.state.sortings}
          sortingsChange={this.changeSortings}
        />
        <LocalSorting />
        <TableView />
        <TableHeaderRow sortingEnabled />
      </DataGrid>
    );
  }
}
