import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { TableCell } from 'material-ui/Table';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const HighlightedCell = ({ value, style }) => (
  <TableCell
    style={{
      backgroundColor: value < 5000 ? 'red' : undefined,
      ...style,
    }}
  >
    <span
      style={{
        color: value < 5000 ? 'white' : undefined,
      }}
    >
      {value}
    </span>
  </TableCell>
);
HighlightedCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  style: PropTypes.object,
};
HighlightedCell.defaultProps = {
  style: {},
};

const Cell = (props) => {
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
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
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table
            cellComponent={Cell}
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
