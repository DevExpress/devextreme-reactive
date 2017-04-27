import React from 'react';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState,
    LocalFiltering, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    VirtualTableView, TableFilterRow, TableSelection, TableRowDetail,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
  defaultColumnValues,
} from '../../demoData';

export class UncontrolledVirtualDemo extends React.PureComponent {
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
        length: 200000,
      }),
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
          getRowId={row => row.id}
        >

          <FilteringState
            defaultFilters={[{ column: 'sex', value: 'female' }]}
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

          <TableHeaderRow sortingEnabled />

          <TableFilterRow />

          <TableSelection />

          <TableRowDetail
            defaultExpandedDetails={[3]}
            template={this.rowTemplate}
            rowHeight={60}
          />

        </DataGrid>
      </div>
    );
  }
}
