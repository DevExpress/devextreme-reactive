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

export class HeaderSortingDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <div>
        <h3>Header Sorting</h3>

        <DataGrid
          rows={rows}
          columns={columns}
        >
          <SortingState defaultSortings={[{ column: 'id', direction: 'asc' }]} />
          <LocalSorting />
          <TableView />
          <TableHeaderRow />
          <TableHeaderRowSorting />
        </DataGrid>
      </div>
    );
  }
}
