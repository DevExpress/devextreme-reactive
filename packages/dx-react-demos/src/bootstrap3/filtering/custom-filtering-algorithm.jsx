import React from 'react';
import {
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demo-data/generator';

const toLowerCase = value => String(value).toLowerCase();
const filterByCity = (value, filter) => toLowerCase(value).startsWith(toLowerCase(filter.value));
const getColumnPredicate = columnName => (columnName === 'city' ? filterByCity : undefined);

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
      rows: generateRows({ length: 14 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ columnName: 'city', value: 'Paris' }]} />
        <LocalFiltering getColumnPredicate={getColumnPredicate} />
        <Table />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    );
  }
}
