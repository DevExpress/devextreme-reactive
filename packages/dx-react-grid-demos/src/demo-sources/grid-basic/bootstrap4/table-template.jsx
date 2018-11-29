import * as React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table-striped"
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }

  render() {
    const { rows, columns } = this.state;

    return (
      <div className="card">
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table
            tableComponent={TableComponent}
          />
          <TableHeaderRow />
        </Grid>
      </div>
    );
  }
}
