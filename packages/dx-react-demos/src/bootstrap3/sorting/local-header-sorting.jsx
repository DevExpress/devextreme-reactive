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
  generateColumns,
  generateRows,
} from '../../demoData';

export class HeaderSortingDemo extends React.PureComponent {
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
        <SortingState />
        <LocalSorting />
        <TableView />
        <TableHeaderRow />
      </DataGrid>
    );
  }
}
