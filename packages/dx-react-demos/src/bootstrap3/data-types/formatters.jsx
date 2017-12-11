import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const CurrencyFormatter = ({ value }) =>
  <b className="text-primary">${value}</b>;

CurrencyFormatter.propTypes = {
  value: PropTypes.number.isRequired,
};

const CurrencyTypeProvider = () => (
  <DataTypeProvider
    type="currency"
    formatterComponent={CurrencyFormatter}
  />
);

const DateFormatter = ({ value }) =>
  value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

DateFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const DateTypeProvider = () => (
  <DataTypeProvider
    type="date"
    formatterComponent={DateFormatter}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date', dataType: 'date' },
        {
          name: 'amount', title: 'Sale Amount', dataType: 'currency', align: 'right',
        },
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
        <DateTypeProvider />
        <Table />
        <TableHeaderRow />
      </Grid>
    );
  }
}
