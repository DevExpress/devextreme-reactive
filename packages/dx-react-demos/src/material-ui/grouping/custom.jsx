import React from 'react';
import Paper from 'material-ui/Paper';
import {
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
} from '../../demo-data/generator';

const cityGroupCriteria = value => ({ key: value.substr(0, 1) });

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
      integratedGroupingColumnExtensions: [
        { columnName: 'city', criteria: cityGroupCriteria },
      ],
      tableGroupColumnExtension: [
        { columnName: 'city', showWhenGrouped: true },
      ],
      rows: generateRows({ length: 14 }),
      grouping: [{ columnName: 'city' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });
  }
  render() {
    const {
      rows, columns, integratedGroupingColumnExtensions, tableGroupColumnExtension, grouping,
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <GroupingState
            grouping={grouping}
          />
          <IntegratedGrouping
            columnExtensions={integratedGroupingColumnExtensions}
          />
          <Table />
          <TableHeaderRow />
          <TableGroupRow
            columnExtensions={tableGroupColumnExtension}
          />
        </Grid>
      </Paper>
    );
  }
}
