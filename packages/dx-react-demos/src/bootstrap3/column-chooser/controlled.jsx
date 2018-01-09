import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
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
      hiddenColumns: ['sex', 'car'],
    };

    this.hiddenColumnsChange = (hiddenColumns) => {
      this.setState({ hiddenColumns });
    };
  }

  render() {
    const {
      columns, rows, tableColumnExtensions, hiddenColumns,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableColumnVisibility
          hiddenColumns={hiddenColumns}
          onHiddenColumnsChange={this.hiddenColumnsChange}
        />
        <Toolbar />
        <ColumnChooser />
      </Grid>
    );
  }
}
