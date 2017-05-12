import React from 'react';
import {
  Grid,
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
  TableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';

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
      <Grid
        rows={rows}
        columns={columns}
      >
        <GroupingState defaultGrouping={[{ columnName: 'city' }]} />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow allowGrouping />
        <TableGroupRow />
        <GroupingPanel />
      </Grid>
    );
  }
}
