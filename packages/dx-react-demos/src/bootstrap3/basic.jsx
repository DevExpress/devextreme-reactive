import React from 'react';
import {
    DataGrid,
} from '@devexpress/dx-react-datagrid';
import {
    TableView,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateColumns,
  generateRows,
  globalSalesValues,
} from '../demoData';

export class BasicDemos extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: generateColumns({ columnValues: globalSalesValues }),
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
        </DataGrid>
      </div>
    );
  }
}
