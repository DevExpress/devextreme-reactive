import React from 'react';
import {
  Grid,
  VirtualTableView,
  TableView,
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
      >
        <VirtualTableView
          tableRowComponentTemplate={({ children, tableRow, style, ...restProps }) => (<tr
            className={tableRow.selected ? 'active' : ''}
            style={tableRow.type === 'data' ?
              { ...{ color: 'red' }, ...style } : null
            }
            onClick={() => {
              alert(JSON.stringify(tableRow.row));
            }}
            {...restProps}
          >
            {children}
          </tr>)}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
