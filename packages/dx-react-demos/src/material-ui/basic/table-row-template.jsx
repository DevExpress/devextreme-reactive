import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI, Paper } from 'material-ui';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const TableRow = ({ children, row }) => (
  <TableRowMUI
    // eslint-disable-next-line no-alert
    onClick={() => alert(JSON.stringify(row))}
  >
    {children}
  </TableRowMUI>
);

TableRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  row: PropTypes.any.isRequired,
};

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
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table
            rowComponent={TableRow}
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
