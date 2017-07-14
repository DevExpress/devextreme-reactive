import React from 'react';
import {
  GroupingState,
  LocalGrouping,
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  DragDropContext,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class LocalGroupingByDndDemo extends React.PureComponent {
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
        <DragDropContext />
        <ColumnOrderState defaultOrder={['city', 'sex', 'car', 'name']} />
        <GroupingState defaultGrouping={[{ columnName: 'city' }]} />
        <LocalGrouping />
        <TableView allowColumnReordering />
        <GroupingPanel allowDragging allowDropping />
        <TableHeaderRow allowGrouping allowDragging />
        <TableGroupRow />
      </Grid>
    );
  }
}
