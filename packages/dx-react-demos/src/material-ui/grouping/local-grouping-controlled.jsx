import React from 'react';
import {
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  DragDropContext,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
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
        data={rows}
        columns={columns}
      >
        <DragDropContext />
        <GroupingState
          grouping={this.state.grouping}
          onGroupingChange={this.changeGrouping}
        />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow allowDragging allowGroupingByClick />
        <TableGroupRow />
        <GroupingPanel allowDragging allowUngroupingByClick />
      </Grid>
    );
  }
}
