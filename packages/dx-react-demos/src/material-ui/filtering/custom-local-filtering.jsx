import React from 'react';
import {
  FilteringState,
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

const getFilteredRows = (rows, filters) => {
  if (!filters.length) return rows;

  return rows.filter(row =>
    filters.reduce((acc, filter) => {
      const filterValue = filter.value.toLowerCase();
      const rowValue = row[filter.columnName].toLowerCase();
      return acc && (rowValue.indexOf(filterValue) !== -1);
    }, true));
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
      filters: [{ columnName: 'city', value: 'Paris' }],
    };

    this.changeFilters = filters => this.setState({ filters });
  }
  render() {
    const { rows, columns, filters } = this.state;
    const filteredRows = getFilteredRows(rows, filters);

    return (
      <Grid
        rows={filteredRows}
        columns={columns}
      >
        <FilteringState
          filters={this.state.filters}
          onFiltersChange={this.changeFilters}
        />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    );
  }
}
