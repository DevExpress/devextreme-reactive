import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui';

export const TableSelectRow = ({
  selected,
  children,
  style,
  changeSelected,
  selectByRowClick,
}) => (
  <TableRow
    style={style}
    selected={selected}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      changeSelected();
    }}
  >
    {children}
  </TableRow>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  changeSelected: PropTypes.func,
  selected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  style: PropTypes.object,
};

TableSelectRow.defaultProps = {
  children: null,
  changeSelected: () => {},
  selected: false,
  selectByRowClick: false,
  style: null,
};
