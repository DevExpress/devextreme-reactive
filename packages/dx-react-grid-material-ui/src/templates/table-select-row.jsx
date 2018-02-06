import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui/Table';

export const TableSelectRow = ({
  selected, selectByRowClick, onToggle,
  row, tableRow, tableColumn,
  children,
  ...restProps
}) => (
  <TableRow
    selected={selected}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {children}
  </TableRow>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  onToggle: PropTypes.func,
  selected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  row: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableSelectRow.defaultProps = {
  children: null,
  onToggle: () => {},
  selected: false,
  selectByRowClick: false,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
};
