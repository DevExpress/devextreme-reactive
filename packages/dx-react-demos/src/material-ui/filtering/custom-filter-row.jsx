import React from 'react';
import {
  Grid,
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-grid';
import {
  TableView,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SexFilterCell,
} from '../components/sex-filter-cell';
import {
  generateRows,
} from '../../demoData';

const filterFn = (row, filter) => {
  const toLowerCase = value => String(value).toLowerCase();

  if (filter.columnName === 'sex') {
    return toLowerCase(row[filter.columnName]) === toLowerCase(filter.value);
  }
  return toLowerCase(row[filter.columnName]).indexOf(toLowerCase(filter.value)) > -1;
};

export class CustomFilterRowDemo extends React.PureComponent {
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
        <FilteringState defaultFilters={[]} />
        <LocalFiltering filterFn={filterFn} />
        <TableView />
        <TableFilterRow
          filterCellTemplate={({ column, setFilter }) => {
            if (column.name === 'sex') {
              return <SexFilterCell setFilter={setFilter} />;
            }

            return undefined;
          }}
        />
      </Grid>
    );
  }
}
