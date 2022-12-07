import * as React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from '@mui/material';

export const TableStubRow = ({
  children,
  tableRow,
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

TableStubRow.propTypes = {
  children: PropTypes.node,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableStubRow.defaultProps = {
  children: undefined,
  tableRow: undefined,
  forwardedRef: undefined,
};
