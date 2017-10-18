import React from 'react';
import {
  TableColumnResizing,
} from '@devexpress/dx-react-grid';
import {
  Grid,
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
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      columnWidths: {
        name: 180, sex: 100, city: 180, car: 240,
      },
      rows: generateRows({ length: 6 }),
    };

    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
    };
  }
  render() {
    const { rows, columns, columnWidths } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <TableView />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={this.changeColumnWidths}
        />
        <TableHeaderRow allowResizing />
      </Grid>
    );
  }
}
