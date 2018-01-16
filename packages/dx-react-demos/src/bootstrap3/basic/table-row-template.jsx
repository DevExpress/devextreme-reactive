import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const styles = {
  banking: {
    backgroundColor: '#f5f5f5',
  },
  health: {
    backgroundColor: '#dff0d8',
  },
  telecom: {
    backgroundColor: '#d9edf7',
  },
  energy: {
    backgroundColor: '#f2dede',
  },
  insurance: {
    backgroundColor: '#fcf8e3',
  },
};

const TableRow = ({ row, ...restProps }) => (
  <Table.Row
    {...restProps}
    // eslint-disable-next-line no-alert
    onClick={() => alert(JSON.stringify(row))}
    style={{
      cursor: 'pointer',
      ...styles[row.sector.toLowerCase()],
    }}
  />
);

TableRow.propTypes = {
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
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table
          rowComponent={TableRow}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
