import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const CurrencyFormatter = ({ value }) =>
  <b style={{ color: 'darkblue' }}>${value}</b>;

CurrencyFormatter.propTypes = {
  value: PropTypes.number.isRequired,
};

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

const DateFormatter = ({ value }) =>
  value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

DateFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const DateTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={DateFormatter}
    {...props}
  />
);

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
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      dateColumns: ['saleDate'],
      currencyColumns: ['amount'],
      rows: generateRows({ columnValues: globalSalesValues, length: 14 }),
    };
  }
  render() {
    const {
      rows, columns, dateColumns, currencyColumns, tableColumnExtensions,
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <CurrencyTypeProvider
            for={currencyColumns}
          />
          <DateTypeProvider
            for={dateColumns}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
