import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableRowMUI from '@material-ui/core/TableRow';

export const TableStubRow = React.forwardRef(({
  children,
  tableRow,
  ...restProps
}, ref) => (
  <TableRowMUI
    ref={ref}
    {...restProps}
  >
    {children}
  </TableRowMUI>
));

TableStubRow.propTypes = {
  children: PropTypes.node,
  tableRow: PropTypes.object,
};

TableStubRow.defaultProps = {
  children: undefined,
  tableRow: undefined,
};
