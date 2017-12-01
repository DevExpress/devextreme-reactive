import React from 'react';
import PropTypes from 'prop-types';

const getColor = (amount) => {
  if (amount < 3000) {
    return '#fc7a76';
  }
  if (amount < 5000) {
    return '#ffb294';
  }
  if (amount < 8000) {
    return '#ffd59f';
  }
  return '#c3e2b7';
};

export const HighlightedCell = ({ column, value, style }) => (
  <td
    style={{
      backgroundColor: getColor(value),
      textAlign: column.align,
      ...style,
    }}
  >
    ${value}
  </td>
);
HighlightedCell.propTypes = {
  value: PropTypes.number.isRequired,
  column: PropTypes.object,
  style: PropTypes.object,
};
HighlightedCell.defaultProps = {
  style: {},
  column: {},
};
