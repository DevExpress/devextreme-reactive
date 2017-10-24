import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from 'material-ui';

export const TableRow = ({ children, style }) => (
  <TableRowMUI
    style={style}
  >
    {children}
  </TableRowMUI>
);

TableRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  style: null,
};
