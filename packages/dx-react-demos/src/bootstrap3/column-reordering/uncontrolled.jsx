import React from 'react';
import {
  Grid,
  DragDropContext,
  Table,
  TableHeaderRow,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap3';

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
      tableColumnExtensions: [
        { columnName: 'sex', width: 100 },
      ],
      rows: generateRows({ length: 6 }),
    };
  }
  render() {
    const { rows, columns, tableColumnExtensions } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <DragDropContext />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableColumnReordering
          defaultOrder={['city', 'sex', 'car', 'name']}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
