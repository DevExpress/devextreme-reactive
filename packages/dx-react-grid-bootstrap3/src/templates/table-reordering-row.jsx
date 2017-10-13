import React from 'react';
import PropTypes from 'prop-types';

export const TableReorderingRow = ({ children }) => (
  <tr style={{ visibility: 'hidden' }}>
    {children}
  </tr>
);

TableReorderingRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

