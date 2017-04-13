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
  generateColumns,
  generateRows,
} from '../../demoData';

export class LocalGroupingControlledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns(),
      rows: generateRows(14),
      grouping: [{ column: 'city' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <GroupingState
          grouping={this.state.grouping}
          groupingChange={this.changeGrouping}
        />
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
