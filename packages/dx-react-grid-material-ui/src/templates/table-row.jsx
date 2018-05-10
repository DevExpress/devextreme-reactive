import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from 'material-ui/Table';

export const TableRow = ({
  children,
  row, tableRow, tableColumn,
  ...restProps
}) => (
  <TableRowMUI
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRow.propTypes = {
  children: PropTypes.node,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableRow.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
