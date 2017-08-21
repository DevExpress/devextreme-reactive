import React from 'react';
import PropTypes from 'prop-types';

export const TableCell = ({ style, column, value }) => (
  <td
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: column.align || 'left',
      ...style,
    }}
  >
    {value}
  </td>
);

TableCell.propTypes = {
  style: PropTypes.shape(),
  value: PropTypes.any,
  column: PropTypes.shape(),
};

TableCell.defaultProps = {
  style: null,
  value: undefined,
  column: {},
};
