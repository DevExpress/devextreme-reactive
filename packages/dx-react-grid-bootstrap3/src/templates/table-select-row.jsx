import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectRow = ({
  selected,
  children,
  changeSelected,
  selectByRowClick,
}) => (
  <tr
    className={selected ? 'active' : ''}
    onClick={
      selectByRowClick ? (e) => {
        e.stopPropagation();
        changeSelected();
      } : undefined
    }
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  changeSelected: PropTypes.func,
  selectByRowClick: PropTypes.bool,
};

TableSelectRow.defaultProps = {
  children: null,
  changeSelected: () => {},
  selected: false,
  selectByRowClick: false,
};
