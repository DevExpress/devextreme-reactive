import React from 'react';
import {
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  employeeTaskValues,
} from '../../demo-data/generator';

const priorityWeights = {
  low: 0,
  normal: 1,
  high: 2,
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'subject', title: 'Subject', width: 300 },
        { name: 'startDate', title: 'Start Date' },
        { name: 'dueDate', title: 'Due Date' },
        { name: 'priority', title: 'Priority' },
      ],
      rows: generateRows({
        columnValues: employeeTaskValues,
        length: 15,
      }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState />
        <LocalSorting
          comparer={(sorting) => {
            if (sorting.columnName === 'priority') {
              return (a, b) => {
                const inverse = sorting.direction === 'desc';
                const priorityA = priorityWeights[a.priority.toLowerCase()];
                const priorityB = priorityWeights[b.priority.toLowerCase()];
                if (priorityA === priorityB) {
                  return 0;
                }
                return (priorityA < priorityB) ^ inverse ? -1 : 1; // eslint-disable-line no-bitwise
              };
            }

            return undefined;
          }}
        />
        <TableView />
        <TableHeaderRow allowSorting />
      </Grid>
    );
  }
}
