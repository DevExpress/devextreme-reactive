import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const TableRow = ({ row, tableRow, ...restProps }) => {
  const { rowId } = tableRow;
  return (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => alert(JSON.stringify(row))}
      style={{
        cursor: 'pointer',
        ...(rowId % 2 ? { backgroundColor: '#dfeef3' } : {}),
      }}
    />
  );
};

TableRow.propTypes = {
  row: PropTypes.any.isRequired,
  tableRow: PropTypes.any.isRequired,
};

const HeaderRow = props => (
  <TableHeaderRow.Row
    {...props}
    style={{
      backgroundColor: 'lightblue',
      color: 'black',
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
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table rowComponent={TableRow} />
          <TableHeaderRow rowComponent={HeaderRow} />
        </Grid>
      </Paper>
    );
  }
}
