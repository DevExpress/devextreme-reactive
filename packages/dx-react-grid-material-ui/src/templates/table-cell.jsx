import React from 'react';
import PropTypes from 'prop-types';

import {
    TableCell as TableCellMUI,
} from 'material-ui';

export const TableCell = ({ style, row, column }) => (
  <TableCellMUI
    style={{
      ...style,
      paddingRight: '24px',
    }}
  >
    {row[column.name]}
  </TableCellMUI>
);

TableCell.propTypes = {
  style: PropTypes.shape(),
  row: PropTypes.shape(),
  column: PropTypes.shape(),
};

TableCell.defaultProps = {
  style: null,
  row: {},
  column: {},
};
