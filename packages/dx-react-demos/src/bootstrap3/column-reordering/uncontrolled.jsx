import React from 'react';
import {
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  DragDropContext,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class UncontrolledDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex', width: 80 },
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
        <ColumnOrderState
          defaultOrder={['city', 'sex', 'car', 'name']}
        />
        <DragDropContext />
        <TableView />
        <TableHeaderRow allowDragging />
      </Grid>
    );
  }
}
