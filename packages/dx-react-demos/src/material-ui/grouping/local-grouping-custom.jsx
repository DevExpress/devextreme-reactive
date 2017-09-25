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
  generateData,
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
      data: generateData({ length: 14 }),
      grouping: [{ columnName: 'city' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });
    this.getGroupValue = (value, grouping) => {
      const { columnName } = grouping;
      if (columnName === 'city') {
        return value.substr(0, 1);
      }
      return value;
    };
  }
  render() {
    const { data, columns, grouping } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <GroupingState
          grouping={grouping}
        />
        <LocalGrouping
          getGroupValue={this.getGroupValue}
        />
        <TableView />
        <TableHeaderRow />
        <TableGroupRow />
      </Grid>
    );
  }
}
