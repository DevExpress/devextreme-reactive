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
const cityPredicate = (value, filter) => toLowerCase(value).startsWith(toLowerCase(filter.value));

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
      localFilteringColumnExtensions: [
        { columnName: 'city', predicate: cityPredicate },
      ],
      rows: generateRows({ length: 14 }),
    };
  }
  render() {
    const { rows, columns, localFilteringColumnExtensions } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ columnName: 'city', value: 'Paris' }]} />
        <LocalFiltering columnExtensions={localFilteringColumnExtensions} />
        <Table />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    );
  }
}
