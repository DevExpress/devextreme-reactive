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

export const HighlightedCell = ({ align, value, style }) => (
  <td
    style={{
      backgroundColor: getColor(value),
      textAlign: align,
      ...style,
    }}
  >
    ${value}
  </td>
);
HighlightedCell.propTypes = {
  align: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
};
HighlightedCell.defaultProps = {
  style: {},
  align: 'left',
};
