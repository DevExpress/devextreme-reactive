import React from 'react';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import { TableRow } from 'material-ui';

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
      hoveredRowId: null,
    };
  }
  render() {
    const { rows, columns, hoveredRowId } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <TableView
          tableRowTemplate={({ children, tableRow }) => (
            <TableRow
              selected={hoveredRowId === tableRow.rowId}
              onMouseEnter={() => this.setState({ hoveredRowId: tableRow.rowId })}
              onMouseLeave={() => this.setState({ hoveredRowId: null })}
            >
              {children}
            </TableRow>
          )}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
