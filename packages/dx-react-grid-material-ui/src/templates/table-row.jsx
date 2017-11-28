import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from 'material-ui';

export const TableRow = ({
  children,
  style,
  tableRow,
  ...restProps
}) => (
  <TableRowMUI
    style={style}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  style: null,
  tableRow: undefined,
};
