import { Column, Table as TableBase } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import * as React from 'react';
import { Card } from 'reactstrap';
import { generateRows } from '../../../demo-data/generator';

interface IRow {
  name: string,
  sex: string,
  city: string,
  car: string
}

const rows: IRow[] = generateRows({ length: 5 });
const columns: Column[] = [
  { name: 'name', title: 'Name' },
  { name: 'sex', title: 'Sex' },
  { name: 'city', title: 'City' },
  { name: 'car', title: 'Car' },
];
const tableColumnExtensions: TableBase.ColumnExtension[] = [
  { columnName: 'sex', width: 100 },
];

export default class Demo extends React.Component<object, object> {
  public render(): React.ReactNode {
    return (
      <Card>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
        </Grid>
      </Card>
    );
  }
}
