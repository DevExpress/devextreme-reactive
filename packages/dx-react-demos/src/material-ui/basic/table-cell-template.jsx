import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import { TableCell, Paper } from 'material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const HighlightedTableCell = ({ value, style, colSpan }) => (
  <TableCell
    style={{
      backgroundColor: 'red',
      ...style,
    }}
    colSpan={colSpan}
  >
    <span style={{ color: 'white' }}>{value}</span>
  </TableCell>
);

HighlightedTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  style: PropTypes.object,
  colSpan: PropTypes.number,
};

HighlightedTableCell.defaultProps = {
  style: {},
  colSpan: 1,
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

    this.tableCellTemplate = ({
      column, value, style, colSpan,
    }) => {
      if (column.name === 'amount' && value < 5000) {
        return <HighlightedTableCell value={value} style={style} colSpan={colSpan} />;
      }
      return undefined;
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
          <TableView tableCellTemplate={this.tableCellTemplate} />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
