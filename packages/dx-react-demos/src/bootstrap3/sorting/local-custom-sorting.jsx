import React from 'react';
import {
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

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
      localSortingColumnExtensions: [
        { columnName: 'priority', compare: comparePriority },
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
    const {
      rows, columns, localSortingColumnExtensions, tableColumnExtensions,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState />
        <LocalSorting
          columnExtensions={localSortingColumnExtensions}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
      </Grid>
    );
  }
}
