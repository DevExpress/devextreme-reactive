import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableGroupRow,
  TableHeaderRowGrouping,
  GroupingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class LocalGroupingWithUIDemo extends React.PureComponent {
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
        <GroupingState defaultGrouping={[{ column: 'city' }]} />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow />
        <TableHeaderRowGrouping />
        <TableGroupRow />
        <GroupingPanel />
      </DataGrid>
    );
  }
}
