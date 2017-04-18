import React from 'react';
import {
    DataGrid,
    TableHeaderRow,
    FilteringState,
    SortingState,
    LocalFiltering,
    LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    VirtualTableView,
    TableFilterRow,
    TableHeaderRowSorting,
    TableRowDetail,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class IntegrationWithOtherPluginsDemo extends React.PureComponent {
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
      rows: generateRows(100000),
    };

    this.rowTemplate = ({ row }) => (
      <div>
        <div>Detail for {row.name} ({row.sex})</div>
        <div>City: {row.city}</div>
        <div>Car: {row.car}</div>
      </div>
    );
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
        <SortingState defaultSorting={[]} />

        <LocalFiltering />
        <LocalSorting />

        <VirtualTableView />

        <TableHeaderRow />
        <TableHeaderRowSorting />

        <TableFilterRow />

        <TableRowDetail template={this.rowTemplate} />
      </DataGrid>
    );
  }
}
