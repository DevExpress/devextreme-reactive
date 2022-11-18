import * as React from 'react';
import PropTypes from 'prop-types';
import TableRowMUI from '@mui/material/TableRow';

export const TableRow = ({
  children,
  row, tableRow,
  forwardedRef,
  ...restProps
}) => (
  <TableRowMUI
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRow.propTypes = {
  children: PropTypes.node,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableRow.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
  forwardedRef: undefined,
};
