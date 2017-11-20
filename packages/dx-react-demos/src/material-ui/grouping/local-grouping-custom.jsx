import React from 'react';
import {
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
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
    this.getColumnIdentity = (columnName) => {
      if (columnName === 'city') {
        return value => ({
          key: value.substr(0, 1),
        });
      }
      return undefined;
    };
  }
  render() {
    const { rows, columns, grouping } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <GroupingState
            grouping={grouping}
          />
          <LocalGrouping
            getColumnIdentity={this.getColumnIdentity}
          />
          <Table />
          <TableHeaderRow />
          <TableGroupRow />
        </Grid>
      </Paper>
    );
  }
}
