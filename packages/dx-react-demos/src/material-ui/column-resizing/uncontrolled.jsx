import React from 'react';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableColumnResizing,
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
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      defaultColumnWidths: {
        name: 180, sex: 100, city: 180, car: 240,
      },
      rows: generateRows({ length: 6 }),
    };
  }
  render() {
    const { rows, columns, defaultColumnWidths } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <TableView />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow allowResizing />
      </Grid>
    );
  }
}
