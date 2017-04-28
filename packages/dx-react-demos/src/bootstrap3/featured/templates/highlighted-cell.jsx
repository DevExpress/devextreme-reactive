import React from 'react';

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
  align: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
};
HighlightedCell.defaultProps = {
  style: {},
  align: 'left',
};
