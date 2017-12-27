import React from 'react';
import {
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
  employeeTaskValues,
} from '../../demo-data/generator';

const priorityWeights = {
  Low: 0,
  Normal: 1,
  High: 2,
};

const comparePriority = (a, b) => {
  const priorityA = priorityWeights[a];
  const priorityB = priorityWeights[b];
  if (priorityA === priorityB) {
    return 0;
  }
  return (priorityA < priorityB) ? -1 : 1;
};

const getColumnCompare = columnName =>
  (columnName === 'priority' ? comparePriority : undefined);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'subject', title: 'Subject' },
        { name: 'startDate', title: 'Start Date' },
        { name: 'dueDate', title: 'Due Date' },
        { name: 'priority', title: 'Priority' },
      ],
      tableColumnExtensions: [
        { columnName: 'subject', width: 300 },
      ],
      rows: generateRows({
        columnValues: employeeTaskValues,
        length: 15,
      }),
    };
  }
  render() {
    const { rows, columns, tableColumnExtensions } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState />
          <LocalSorting
            getColumnCompare={getColumnCompare}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow showSortingControls />
        </Grid>
      </Paper>
    );
  }
}
