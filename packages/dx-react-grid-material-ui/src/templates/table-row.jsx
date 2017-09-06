import React from 'react';
import PropTypes from 'prop-types';

import {
  TableRow as TableRowMUI,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const TableRowBase = ({ children, row, ...restProps }) => (
  <TableRowMUI
    selected={row.selected}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRowBase.propTypes = {
  row: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRowBase.defaultProps = {
  children: null,
};

export const TableRow = withStyles({}, { name: 'TableRow' })(TableRowBase);
