import * as React from 'react';
import * as PropTypes from 'prop-types';

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

export const HighlightedCell = ({ tableColumn, value, style }) => (
  <td
    style={{
      backgroundColor: getColor(value),
      textAlign: tableColumn.align,
      ...style,
    }}
  >
    ${value}
  </td>
);

HighlightedCell.propTypes = {
  value: PropTypes.number.isRequired,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
};
HighlightedCell.defaultProps = {
  style: {},
  tableColumn: {},
};
