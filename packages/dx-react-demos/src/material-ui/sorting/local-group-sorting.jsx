import React from 'react';
import {
  SortingState,
  GroupingState,
  LocalSorting,
  LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
} from '@devexpress/dx-react-grid-material-ui';

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
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSorting={[
            { columnName: 'city', direction: 'asc' },
            { columnName: 'name', direction: 'desc' },
          ]}
        />
        <GroupingState
          defaultGrouping={[{ columnName: 'city' }]}
        />
        <LocalSorting />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow allowSorting allowGrouping />
        <TableGroupRow />
        <GroupingPanel allowSorting />
      </Grid>
    );
  }
}
