import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableSelectRow = ({
  selected, selectByRowClick, onToggle,
  children, className,
  row, tableRow, tableColumn,
  ...restProps
}) => (
  <tr
    className={classNames(selected ? 'active' : '', className)}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  onToggle: PropTypes.func,
  selectByRowClick: PropTypes.bool,
  className: PropTypes.string,
  row: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableSelectRow.defaultProps = {
  children: null,
  onToggle: () => {},
  selected: false,
  selectByRowClick: false,
  className: undefined,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
};
