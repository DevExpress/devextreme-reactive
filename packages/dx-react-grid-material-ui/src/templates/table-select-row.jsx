import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui';

export const TableSelectRow = ({ tableRow, selected, children, changeSelected, ...restProps }) => (
  <TableRow
    selected={selected}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
    {...restProps}
  >
    {children}
  </TableRow>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
  tableRow: PropTypes.object,
};

TableSelectRow.defaultProps = {
  children: null,
  selected: false,
  changeSelected: () => {},
  tableRow: {},
};
