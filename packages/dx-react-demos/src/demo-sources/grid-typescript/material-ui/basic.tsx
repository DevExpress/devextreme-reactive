import * as React from 'react';
import { Column, TableColumnExtension } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { generateRows } from '../../../demo-data/generator';

const rows = generateRows({ length: 5 });
const columns: Array<Column> = [
  { name: 'name', title: 'Name' },
  { name: 'sex', title: 'Sex' },
  { name: 'city', title: 'City' },
  { name: 'car', title: 'Car' },
];
const tableColumnExtensions: Array<TableColumnExtension> = [
  { columnName: 'sex', width: 100 },
];

export default class Demo extends React.Component {
  render() {
    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
      </Grid>
    );
  }
}
