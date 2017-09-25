import React from 'react';
import {
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  DragDropContext,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateData,
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
      data: generateData({ length: 6 }),
      columnOrder: ['city', 'sex', 'car', 'name'],
    };

    this.changeColumnOrder = this.changeColumnOrder.bind(this);
  }
  changeColumnOrder(newOrder) {
    this.setState({ columnOrder: newOrder });
  }
  render() {
    const { data, columns, columnOrder } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <ColumnOrderState
          order={columnOrder}
          onOrderChange={this.changeColumnOrder}
        />
        <DragDropContext />
        <TableView allowColumnReordering />
        <TableHeaderRow allowDragging />
      </Grid>
    );
  }
}
