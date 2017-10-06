import React from 'react';
import PropTypes from 'prop-types';
import {
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const UnitsFilterCell = ({ filter, setFilter }) => (
  <th style={{ fontWeight: 'normal' }}>
    <input
      type="number"
      className="form-control text-right"
      value={filter ? filter.value : ''}
      min={1}
      max={4}
      onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
    />
  </th>
);

UnitsFilterCell.propTypes = {
  filter: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
  setFilter: PropTypes.func.isRequired,
};

UnitsFilterCell.defaultProps = {
  filter: null,
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'units', title: 'Quantity', align: 'right' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 14 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[{ columnName: 'units', value: 2 }]} />
        <LocalFiltering />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow
          filterCellTemplate={({ column, filter, setFilter }) => {
            if (column.name === 'units') {
              return <UnitsFilterCell filter={filter} setFilter={setFilter} />;
            }

            return undefined;
          }}
        />
      </Grid>
    );
  }
}
