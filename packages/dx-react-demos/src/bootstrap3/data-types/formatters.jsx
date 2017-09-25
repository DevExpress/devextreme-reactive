import React from 'react';
import {
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateData,
  globalSalesValues,
} from '../../demo-data/generator';

const CurrencyTypeProvider = () => (
  <DataTypeProvider
    type="currency"
    formatterTemplate={({ value }) => (
      <b className="text-primary">${value}</b>
    )}
  />
);
const DateTypeProvider = () => (
  <DataTypeProvider
    type="date"
    formatterTemplate={({ value }) =>
      value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1')}
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
        { name: 'amount', title: 'Sale Amount', dataType: 'currency', align: 'right' },
      ],
      data: generateData({ columnValues: globalSalesValues, length: 14 }),
    };
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
      >
        <CurrencyTypeProvider />
        <DateTypeProvider />
        <TableView />
        <TableHeaderRow />
      </Grid>
    );
  }
}
