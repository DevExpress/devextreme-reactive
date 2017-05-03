import React from 'react';
import PropTypes from 'prop-types';

export const TableNoDataCell = ({ style, colspan }) => (
  <td
    style={{
      textAlign: 'center',
      padding: '40px 0',
      ...style,
    }}
    colSpan={colspan}
  >
    <big className="text-muted">No data</big>
  </td>
);

TableNoDataCell.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
};

TableNoDataCell.defaultProps = {
  style: null,
  colspan: 1,
};
