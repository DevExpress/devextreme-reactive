import React from 'react';
import PropTypes from 'prop-types';

export const TableReorderingRow = ({ children, style }) => (
  <tr style={{ ...style, visibility: 'hidden' }}>
    {children}
  </tr>
);

TableReorderingRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  style: PropTypes.object,
};

TableReorderingRow.defaultProps = {
  style: {},
};

