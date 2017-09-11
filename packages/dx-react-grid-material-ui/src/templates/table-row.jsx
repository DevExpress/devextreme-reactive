import React from 'react';
import PropTypes from 'prop-types';

import {
  TableRow as TableRowMUI,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const TableRowBase = ({ children, tableRow, ...restProps }) => (
  <TableRowMUI
    selected={tableRow.selected}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRowBase.propTypes = {
  tableRow: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRowBase.defaultProps = {
  children: null,
};

export const TableRow = withStyles({}, { name: 'TableRow' })(TableRowBase);
