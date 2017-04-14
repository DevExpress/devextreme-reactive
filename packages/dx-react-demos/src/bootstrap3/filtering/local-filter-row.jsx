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

export class LocalFilterRowDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ column: 'car', value: 'r' }]} />
        <LocalFiltering />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
      </DataGrid>
    );
  }
}
