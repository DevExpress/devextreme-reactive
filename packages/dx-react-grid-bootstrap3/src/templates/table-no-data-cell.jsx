import React from 'react';
import PropTypes from 'prop-types';

export const TableNoDataCell = ({ style, colSpan }) => (
  <td
    style={{
      textAlign: 'center',
      padding: '40px 0',
      ...style,
    }}
    colSpan={colSpan}
  >
    <big className="text-muted">No data</big>
  </td>
);

TableNoDataCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
};

TableNoDataCell.defaultProps = {
  style: null,
  colSpan: 1,
};
