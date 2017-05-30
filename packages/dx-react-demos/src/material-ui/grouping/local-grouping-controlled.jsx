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
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
} from '../../demoData';

export class LocalGroupingControlledDemo extends React.PureComponent {
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
      grouping: [{ columnName: 'city' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <GroupingState
          grouping={this.state.grouping}
          onGroupingChange={this.changeGrouping}
        />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow allowGrouping />
        <TableGroupRow />
        <GroupingPanel />
      </Grid>
    );
  }
}
