import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as TableRowMUI } from 'material-ui';

export const TableRow = ({
  children, style,
  tableRow, tableColumn,
  toggleGroupExpanded,
  isExpanded, ...restProps
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
  tableColumn: PropTypes.object,
  toggleGroupExpanded: PropTypes.func,
  isExpanded: PropTypes.bool,
};

TableRow.defaultProps = {
  children: null,
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
  toggleGroupExpanded: undefined,
  isExpanded: undefined,
};
