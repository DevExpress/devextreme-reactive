import React from 'react';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState,
    LocalFiltering, LocalSorting,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    VirtualTableView, TableFilterRow, TableSelection, TableRowDetail, TableHeaderRowSorting,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class UncontrolledVirtualDemo extends React.PureComponent {
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
      rows: generateRows({ length: 200000 }),
    };

    this.rowTemplate = ({ row }) => (
      <div>
        Detail for {row.name}
        <br />
        from {row.city}
      </div>
    );
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <div>
        <h3>Uncontrolled Virtual Demo (200K rows)</h3>

        <DataGrid
          rows={rows}
          columns={columns}
        >

          <FilteringState
            defaultFilters={[{ column: 'sex', value: 'fe' }]}
          />

          <SortingState
            defaultSortings={[{ column: 'name', direction: 'asc' }]}
          />

          <SelectionState
            defaultSelection={[1, 3, 18]}
          />

          <LocalFiltering />
          <LocalSorting />

          <VirtualTableView />

          <TableHeaderRow />
          <TableHeaderRowSorting />

          <TableFilterRow />

          <TableSelection />

          <TableRowDetail
            defaultExpandedDetails={[3]}
            template={this.rowTemplate}
          />

        </DataGrid>
      </div>
    );
  }
}
