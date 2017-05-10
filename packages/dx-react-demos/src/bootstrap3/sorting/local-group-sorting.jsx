import React from 'react';
import {
  DataGrid,
  SortingState,
  GroupingState,
  LocalSorting,
  LocalGrouping,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class LocalGroupSortingDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
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
          defaultSorting={[
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
        <TableHeaderRow allowSorting />
        <TableGroupRow />
        <GroupingPanel allowSorting />
      </DataGrid>
    );
  }
}
