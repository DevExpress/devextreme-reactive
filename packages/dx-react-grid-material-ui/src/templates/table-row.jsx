import React from 'react';
import PropTypes from 'prop-types';

import {
  TableRow as TableRowMUI,
} from 'material-ui';

export const TableRow = ({ children, tableRow, ...restProps }) => (
  <TableRowMUI
    selected={tableRow.selected}
    {...restProps}
  >
    {children}
  </TableRowMUI>
);

TableRow.propTypes = {
  tableRow: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: null,
};
