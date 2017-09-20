import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({ children, style }) => (
  <tr
    style={style}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape(),
};

TableRow.defaultProps = {
  children: null,
  style: null,
};
