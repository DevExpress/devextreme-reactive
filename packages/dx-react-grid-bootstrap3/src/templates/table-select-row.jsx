import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSelectRow = ({
  highlighted, selectByRowClick, onToggle,
  children, className,
  row, tableRow, tableColumn, forwardedRef,
  ...restProps
}) => (
  <tr
    ref={forwardedRef}
    className={classNames(highlighted ? 'active' : '', className)}
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
  highlighted: PropTypes.bool,
  children: PropTypes.node,
  onToggle: PropTypes.func,
  selectByRowClick: PropTypes.bool,
  className: PropTypes.string,
  row: PropTypes.any,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableSelectRow.defaultProps = {
  children: undefined,
  onToggle: () => {},
  highlighted: false,
  selectByRowClick: false,
  className: undefined,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  forwardedRef: undefined,
};
