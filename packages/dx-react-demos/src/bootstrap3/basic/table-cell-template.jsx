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

const HighlightedCell = ({ value, style }) => (
  <td
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
  </td>
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

const getCellComponent = (columnName) => {
  if (columnName === 'amount') {
    return HighlightedCell;
  }
  return undefined;
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
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table
          getCellComponent={getCellComponent}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
