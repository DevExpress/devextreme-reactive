import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRowSorting,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalSortingControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
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
        <TableHeaderRow />
        <TableHeaderRowSorting />
      </DataGrid>
    );
  }
}
