import React from 'react';
import Paper from 'material-ui/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
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
      rows: generateRows({ length: 6 }),
      defaultHiddenColumns: ['sex', 'car'],
    };
  }

  render() {
    const { columns, rows, defaultHiddenColumns } = this.state;
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <Toolbar />
          <TableHeaderRow />
          <TableColumnVisibility
            defaultHiddenColumns={defaultHiddenColumns}
          />
          <ColumnChooser />
        </Grid>
      </Paper>
    );
  }
}
