import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({ children, row, ...restProps }) => (
  <tr
    className={row.selected ? 'active' : ''}
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: null,
};
