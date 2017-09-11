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
        { name: 'city', title: 'City', showWhenGrouped: true },
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
        />
        <LocalGrouping
          getGroupValue={(value, grouping) => {
            const { columnName } = grouping;
            if (columnName === 'city') {
              return value.substr(0, 1);
            }
            return value;
          }}
        />
        <TableView />
        <TableHeaderRow />
        <TableGroupRow />
      </Grid>
    );
  }
}
