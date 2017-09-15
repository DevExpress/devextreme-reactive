import React from 'react';
import PropTypes from 'prop-types';

export const TableCell = ({ style, column, value, children }) => (
  <td
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: column.align || 'left',
      ...style,
    }}
  >
    {children || value}
  </td>
);

TableCell.propTypes = {
  style: PropTypes.shape(),
  value: PropTypes.any,
  column: PropTypes.shape(),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableCell.defaultProps = {
  style: null,
  value: undefined,
  column: {},
  children: undefined,
};
