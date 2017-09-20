import React from 'react';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import { TableCell } from 'material-ui';

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
      >
        <TableView
          tableCellTemplate={({ column, value, style, colSpan }) => (
            (column.name === 'amount' && value < 5000) ?
              <TableCell
                style={{
                  backgroundColor: 'red',
                  ...style,
                }}
                colSpan={colSpan}
              >
                <span style={{ color: 'white' }}>{value}</span>
              </TableCell>
              : undefined
          )}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
