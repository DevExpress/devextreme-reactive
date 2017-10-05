import React from 'react';
import PropTypes from 'prop-types';

export const TableNoDataCell = ({ style, colSpan, noDataText }) => (
  <td
    style={{
      textAlign: 'center',
      padding: '40px 0',
      ...style,
    }}
    colSpan={colSpan}
  >
    <big className="text-muted">{noDataText}</big>
  </td>
);

TableNoDataCell.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  noDataText: PropTypes.string,
};

TableNoDataCell.defaultProps = {
  style: null,
  colSpan: 1,
  noDataText: 'No data',
};
