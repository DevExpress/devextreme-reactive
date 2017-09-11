import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from 'material-ui';

export const TableRow = ({ tableRow, children, ...restProps }) => (
  <TableRowMUI {...restProps}>{children}</TableRowMUI>
);

TableRow.propTypes = {
  tableRow: PropTypes.object,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  tableRow: {},
  children: null,
};
