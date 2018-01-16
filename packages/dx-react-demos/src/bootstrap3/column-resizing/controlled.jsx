import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
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
      columnWidths: [
        { columnName: 'name', width: 180 },
        { columnName: 'sex', width: 180 },
        { columnName: 'city', width: 180 },
        { columnName: 'car', width: 240 },
      ],
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
        <Table />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={this.changeColumnWidths}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
