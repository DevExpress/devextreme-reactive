import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  SortingState,
  GroupingState,
  LocalSorting,
  LocalGrouping,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableGroupRow,
  TableHeaderRowSorting,
  TableHeaderRowGrouping,
  GroupingPanel,
  GroupingPanelSorting,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class LocalGroupSortingDemo extends React.PureComponent {
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
        <SortingState
          defaultSortings={[
            { column: 'city', direction: 'asc' },
            { column: 'name', direction: 'desc' },
          ]}
        />
        <GroupingState
          defaultGrouping={[{ column: 'city' }]}
        />
        <LocalSorting />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow />
        <TableGroupRow />
        <TableHeaderRowSorting />
        <TableHeaderRowGrouping />
        <GroupingPanel />
        <GroupingPanelSorting />
      </DataGrid>
    );
  }
}
