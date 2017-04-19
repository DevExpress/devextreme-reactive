import React from 'react';
import {
    DataGrid,
    SortingState, SelectionState, FilteringState, GroupingState,
    LocalFiltering, LocalGrouping, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableSelection, TableRowDetail,
    VirtualTableView, TableFilterRow, GroupingPanel, TableGroupRow,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class UncontrolledGroupedVirtualDemo extends React.PureComponent {
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
      rows: generateRows({ length: 20000 }),
    };

    this.rowTemplate = ({ row }) => <div>Detail for {row.name} from {row.city}</div>;
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <div>
        <h3>Uncontrolled Grouped Virtual Demo (20K rows)</h3>

        <DataGrid
          rows={rows}
          columns={columns}
        >

          <FilteringState
            defaultFilters={[{ column: 'car', value: 'au' }]}
          />

          <SortingState
            defaultSortings={[{ column: 'name', direction: 'asc' }]}
          />

          <GroupingState
            defaultGrouping={[{ column: 'sex' }]}
            defaultExpandedGroups={{ Female: true }}
          />

          <SelectionState
            defaultSelection={[1, 3, 18]}
          />

          <LocalFiltering />
          <LocalSorting />
          <LocalGrouping />

          <VirtualTableView />

          <TableHeaderRow />
          <TableFilterRow />

          <TableSelection />

          <TableRowDetail
            defaultExpandedDetails={[3]}
            template={this.rowTemplate}
          />

          <TableGroupRow />
          <GroupingPanel />
        </DataGrid>
      </div>
    );
  }
}
