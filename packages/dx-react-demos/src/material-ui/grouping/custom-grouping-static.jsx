import React from 'react';
import {
  GroupingState,
  CustomGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
  defaultColumnValues,
} from '../../demo-data/generator';

const getChildGroups = groups => groups
  .map(group => ({ key: group.key, childRows: group.items }));

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
      grouping: [{ columnName: 'sex' }],
      data: [{
        key: 'Male',
        items: generateRows({
          columnValues: { ...defaultColumnValues, sex: ['Male'] },
          length: 7,
        }),
      }, {
        key: 'Female',
        items: generateRows({
          columnValues: { ...defaultColumnValues, sex: ['Female'] },
          length: 7,
        }),
      }],
    };
  }
  render() {
    const { data, columns, grouping } = this.state;

    return (
      <Paper>
        <Grid
          rows={data}
          columns={columns}
        >
          <GroupingState
            grouping={grouping}
          />
          <CustomGrouping
            getChildGroups={getChildGroups}
          />
          <TableView />
          <TableHeaderRow />
          <TableGroupRow />
        </Grid>
      </Paper>
    );
  }
}
