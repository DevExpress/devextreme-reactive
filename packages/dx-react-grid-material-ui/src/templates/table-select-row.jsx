import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui';

export const TableSelectRow = ({
  tableRow,
  children,
  changeSelected,
  selectByRowClick,
  ...restProps
}) => (
  <TableRow
    selected={tableRow.selected}
    onClick={
      selectByRowClick ? (e) => {
        e.stopPropagation();
        changeSelected();
      } : undefined
    }
    {...restProps}
  >
    {children}
  </TableRow>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  changeSelected: PropTypes.func,
  tableRow: PropTypes.object,
  selectByRowClick: PropTypes.bool,
};

TableSelectRow.defaultProps = {
  children: null,
  changeSelected: () => {},
  tableRow: {},
  selectByRowClick: false,
};
