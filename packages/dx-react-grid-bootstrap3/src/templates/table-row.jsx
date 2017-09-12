import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({ children, tableRow, ...restProps }) => (
  <tr
    className={tableRow.selected ? 'active' : ''}
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  tableRow: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: null,
};
