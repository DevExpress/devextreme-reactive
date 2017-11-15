import React from 'react';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableHeaderCell,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

// eslint-disable-next-line react/prop-types
const TableHeaderCellCustom = ({ style, ...restProps }) => (
  <TableHeaderCell
    {...restProps}
    style={{
      ...style,
      backgroundColor: 'red',
    }}
  />
);

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
        <TableView />
        <TableHeaderRow
          headerCellTemplate={args => (
            <TableHeaderCellCustom
              {...args}
            />)
          }
        />
      </Grid>
    );
  }
}
