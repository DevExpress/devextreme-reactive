import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectRow = ({ tableRow, selected, children, changeSelected, ...restProps }) => (
  <tr
    className={selected ? 'active' : ''}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
    {...restProps}
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  tableRow: PropTypes.object,
  children: PropTypes.node,
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
};

TableSelectRow.defaultProps = {
  children: null,
  selected: false,
  changeSelected: () => {},
  tableRow: {},
};
