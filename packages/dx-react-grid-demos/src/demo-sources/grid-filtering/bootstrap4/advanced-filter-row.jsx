import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FilteringState, IntegratedFiltering, DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow, TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap4';

import { generateRows, globalSalesValues } from '../../../demo-data/generator';

const FilterIcon = ({ type }) => {
  if (type === 'month') {
    return (
      <span
        className="d-block oi oi-calendar"
      />
    );
  }
  return <TableFilterRow.Icon type={type} />;
};

const CurrencyEditor = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <input
      className="form-control text-right"
      type="number"
      placeholder="Filter..."
      value={value === undefined ? '' : value}
      min={0}
      onChange={handleChange}
    />
  );
};

CurrencyEditor.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
};

CurrencyEditor.defaultProps = {
  value: undefined,
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
      dateColumns: ['saleDate'],
      dateFilterOperations: ['month', 'contains', 'startsWith', 'endsWith'],
      currencyColumns: ['amount'],
      currencyFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
      filteringColumnExtensions: [
        {
          columnName: 'saleDate',
          predicate: (value, filter, row) => {
            if (!filter.value.length) return true;
            if (filter && filter.operation === 'month') {
              const month = parseInt(value.split('-')[1], 10);
              return month === parseInt(filter.value, 10);
            }
            return IntegratedFiltering.defaultPredicate(value, filter, row);
          },
        },
      ],
    };
  }

  render() {
    const {
      rows, columns, dateColumns, dateFilterOperations, filteringColumnExtensions,
      currencyColumns, currencyFilterOperations,
    } = this.state;

    return (
      <div className="card">
        <Grid
          rows={rows}
          columns={columns}
        >
          <DataTypeProvider
            for={dateColumns}
            availableFilterOperations={dateFilterOperations}
          />
          <DataTypeProvider
            for={currencyColumns}
            availableFilterOperations={currencyFilterOperations}
            editorComponent={CurrencyEditor}
          />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />

          <Table />
          <TableHeaderRow />
          <TableFilterRow
            showFilterSelector
            iconComponent={FilterIcon}
            messages={{ month: 'Month equals' }}
          />
        </Grid>
      </div>
    );
  }
}
