import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from 'material-ui';

export const TableRow = ({
  children, style,
  row, tableRow, tableColumn,
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
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  style: null,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
