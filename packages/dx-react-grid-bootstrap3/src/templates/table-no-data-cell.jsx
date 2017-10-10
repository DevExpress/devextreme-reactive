import React from 'react';
import PropTypes from 'prop-types';

export const TableNoDataCell = ({ style, colSpan, noData }) => (
  <td
    style={{
      textAlign: 'center',
      padding: '40px 0',
      ...style,
    }}
    colSpan={colSpan}
  >
    <big className="text-muted">{noData}</big>
  </td>
);

TableNoDataCell.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  noData: PropTypes.string,
};

TableNoDataCell.defaultProps = {
  style: null,
  colSpan: 1,
  noData: 'No data',
};
