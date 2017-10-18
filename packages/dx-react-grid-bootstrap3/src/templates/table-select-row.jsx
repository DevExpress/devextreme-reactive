import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectRow = ({
  selected,
  children,
  style,
  changeSelected,
  selectByRowClick,
}) => (
  <tr
    style={style}
    className={selected ? 'active' : ''}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      changeSelected();
    }}
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  changeSelected: PropTypes.func,
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
