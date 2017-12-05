import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'channel', title: 'Channel' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
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
        rootComponent={({ children }) => <Grid.Root style={{ color: 'red' }} className="root" data="data1"> {children} </Grid.Root>}
        headerPlaceholderComponent={({ children }) => <Grid.Header style={{ backgroundColor: 'green' }} className="header" data="data2">{ children } </Grid.Header>}
        footerPlaceholderComponent={({ children }) => <Grid.Footer className="footer" data="data3">{ children } </Grid.Footer>}
      >
        <Table />
        <TableHeaderRow />
      </Grid>
    );
  }
}
