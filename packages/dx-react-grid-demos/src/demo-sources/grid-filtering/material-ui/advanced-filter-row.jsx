import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { FilteringState, IntegratedFiltering, DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow, TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import DateRange from '@material-ui/icons/DateRange';

import { generateRows, globalSalesValues } from '../../../demo-data/generator';

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const styles = {
  numericInput: {
    textAlign: 'right',
    width: '100%',
  },
};

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
      }}
      fullWidth
      value={value === undefined ? '' : value}
      inputProps={{
        min: 0,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditorBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

CurrencyEditorBase.defaultProps = {
  value: undefined,
};

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

export default () => {
  const [columns] = useState([
    { name: 'customer', title: 'Customer' },
    { name: 'product', title: 'Product' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'amount', title: 'Sale Amount' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
  const [dateColumns] = useState(['saleDate']);
  const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
  const [currencyColumns] = useState(['amount']);
  const [currencyFilterOperations] = useState([
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
  ]);
  const [filteringColumnExtensions] = useState([
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
  ]);

  return (
    <Paper>
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
    </Paper>
  );
};
