import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableRowMUI from '@material-ui/core/TableRow';

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
