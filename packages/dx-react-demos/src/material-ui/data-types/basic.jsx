import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Input } from 'material-ui';
import {
  DataTypeProvider,
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
  globalSalesValues,
} from '../../demo-data/generator';

const styles = () => ({
  input: {
    width: '100%',
  },
});

const CurrencyInputBase = ({ value, onChange, classes }) => (
  <Input
    className={classes.input}
    inputProps={{
      style: {
        textAlign: 'right',
      },
    }}
    value={value}
    placeholder={'$'}
    onChange={onChange}
  />
);

CurrencyInputBase.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const CurrencyInput = withStyles(styles, { name: 'CurrencyInput' })(CurrencyInputBase);

const CurrencyTypeProvider = () => (
  <DataTypeProvider
    type="currency"
    formatterTemplate={({ value }) => (
      <div className="text-right">
        <b className="text-muted">$</b>{value}
      </div>
    )}
    editorTemplate={({ filter, setFilter }) => (
      <CurrencyInput
        value={filter ? filter.value : ''}
        onChange={e => setFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount', dataType: 'currency' },
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
        <CurrencyTypeProvider />
        <FilteringState defaultFilters={[]} />
        <LocalFiltering />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    );
  }
}
