import React from 'react';
import {
    DataGrid,
    FilteringState,
    SortingState,
    LocalFiltering,
    LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    VirtualTableView,
    TableHeaderRow,
    TableFilterRow,
    TableRowDetail,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
  defaultColumnValues,
} from '../../demoData';

export class IntegrationWithOtherPluginsDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 100000,
      }),
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
        getRowId={row => row.id}
      >
        <FilteringState defaultFilters={[]} />
        <SortingState defaultSorting={[{ column: 'city', direction: 'asc' }]} />

        <LocalFiltering />
        <LocalSorting />

        <VirtualTableView />

        <TableHeaderRow allowSorting />

        <TableFilterRow rowHeight={51} />

        <TableRowDetail
          template={this.rowTemplate}
          rowHeight={80}
        />
      </DataGrid>
    );
  }
}
