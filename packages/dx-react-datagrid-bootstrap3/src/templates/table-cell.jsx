import React from 'react';
import PropTypes from 'prop-types';

export const TableCell = ({ style, row, column }) => (
  <td
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: column.align || 'left',
      ...style,
    }}
  >
    {row[column.name]}
  </td>
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
