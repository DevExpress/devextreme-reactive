import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
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
      defaultColumnWidths: [
        { columnName: 'name', width: 180 },
        { columnName: 'sex', width: 180 },
        { columnName: 'city', width: 180 },
        { columnName: 'car', width: 240 },
      ],
      rows: generateRows({ length: 6 }),
    };
  }
  render() {
    const { rows, columns, defaultColumnWidths } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
