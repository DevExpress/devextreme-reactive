import React from 'react';
import {
    DataGrid,
    TableHeaderRow,
} from '@devexpress/dx-react-datagrid';
import {
    TableView,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../demoData';

export class BasicDemos extends React.PureComponent {
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
      <div>
        <h3>Basic Demo</h3>

        <DataGrid
          rows={rows}
          columns={columns}
        >
          <TableView />
          <TableHeaderRow />
        </DataGrid>
      </div>
    );
  }
}
