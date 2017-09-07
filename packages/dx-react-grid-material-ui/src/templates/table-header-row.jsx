import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui';

export const TableHeaderRow = ({ children, style }) => (
  <TableRow
    style={style}
  >
    {children}
  </TableRow>
);

TableHeaderRow.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.node,
};

TableHeaderRow.defaultProps = {
  children: null,
  style: null,
};
