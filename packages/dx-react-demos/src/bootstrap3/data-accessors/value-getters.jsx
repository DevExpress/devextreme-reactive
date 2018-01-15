import React from 'react';
import {
  Grid,
  Table,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
  generateRows,
  defaultNestedColumnValues,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: 'firstName',
          getCellValue: row => (row.user ? row.user.firstName : undefined),
        },
        {
          name: 'lastName',
          getCellValue: row => (row.user ? row.user.lastName : undefined),
        },
        {
          name: 'car',
          getCellValue: row => (row.car ? row.car.model : undefined),
        },
        { name: 'position' },
        { name: 'city' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultNestedColumnValues },
        length: 8,
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
        <Table />
      </Grid>
    );
  }
}
