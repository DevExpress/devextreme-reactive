import React from 'react';
import {
  TableColumnReordering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  DragDropContext,
  TableView,
  TableHeaderRow,
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
        { name: 'sex', title: 'Sex', width: 100 },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 6 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <DragDropContext />
        <TableView allowColumnReordering />
        <TableColumnReordering
          defaultOrder={['city', 'sex', 'car', 'name']}
        />
        <TableHeaderRow allowDragging />
      </Grid>
    );
  }
}
