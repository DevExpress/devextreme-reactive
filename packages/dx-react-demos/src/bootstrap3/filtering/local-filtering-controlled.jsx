import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableFilterRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalFilteringControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
      filters: [{ column: 'car', value: 'r' }],
    };

    this.changeFilters = filters => this.setState({ filters });
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <FilteringState
          filters={this.state.filters}
          filtersChange={this.changeFilters}
        />
        <LocalFiltering />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
      </DataGrid>
    );
  }
}
