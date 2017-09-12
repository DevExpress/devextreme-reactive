import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectRow = ({
  tableRow,
  children,
  changeSelected,
  selectByRowClick,
  ...restProps
}) => (
  <tr
    className={tableRow.selected ? 'active' : ''}
    onClick={selectByRowClick ? (e) => {
      e.stopPropagation();
      changeSelected();
    } : () => {}}
    {...restProps}
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  tableRow: PropTypes.object,
  children: PropTypes.node,
  changeSelected: PropTypes.func,
  selectByRowClick: PropTypes.bool,
};

TableSelectRow.defaultProps = {
  children: null,
  changeSelected: () => {},
  tableRow: {},
  selectByRowClick: false,
};
