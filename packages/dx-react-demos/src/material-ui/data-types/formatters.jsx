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
        { name: 'amount', title: 'Sale Amount', dataType: 'currency' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 14 }),
    };
  }
  render() {
    const { rows, columns, tableColumnExtensions } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <CurrencyTypeProvider />
          <DateTypeProvider />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
