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
  generateRows,
} from '../../demoData';

export class LocalFilterRowDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'sex', title: 'Sex' },
        { name: 'name', title: 'Name' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
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
