import React from 'react';
import {
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
} from '../../demo-data/generator';

const predicate = (row, filter) => {
  const toLowerCase = value => String(value).toLowerCase();
  return toLowerCase(row[filter.columnName]).startsWith(toLowerCase(filter.value));
};

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
        <LocalFiltering predicate={predicate} />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    );
  }
}
