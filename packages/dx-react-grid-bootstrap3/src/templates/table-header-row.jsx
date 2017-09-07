import React from 'react';
import PropTypes from 'prop-types';

export const TableHeaderRow = ({ children, style }) => (
  <tr
    style={style}
  >
    {children}
  </tr>
);

TableHeaderRow.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.node,
};

TableHeaderRow.defaultProps = {
  children: null,
  style: null,
};
