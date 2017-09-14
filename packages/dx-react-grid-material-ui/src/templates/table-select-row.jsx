import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui';

export const TableSelectRow = ({
  selected,
  children,
  changeSelected,
  selectByRowClick,
}) => (
  <TableRow
    selected={selected}
    onClick={
      selectByRowClick ? (e) => {
        e.stopPropagation();
        changeSelected();
      } : undefined
    }
  >
    {children}
  </TableRow>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  changeSelected: PropTypes.func,
  selected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
};

TableSelectRow.defaultProps = {
  children: null,
  changeSelected: () => {},
  selected: false,
  selectByRowClick: false,
};
