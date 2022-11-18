import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSelectRow = ({
  highlighted,
  children,
  style,
  onToggle,
  selectByRowClick,
  className,
  tableRow,
  forwardedRef,
  ...restProps
}) => (
  <tr
    ref={forwardedRef}
    style={style}
    className={classNames({
      'table-active': highlighted,
    }, className)}
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
  children: PropTypes.node,
  className: PropTypes.string,
  onToggle: PropTypes.func,
  selectByRowClick: PropTypes.bool,
  highlighted: PropTypes.bool,
  style: PropTypes.object,
  tableRow: PropTypes.object,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableSelectRow.defaultProps = {
  children: null,
  className: undefined,
  onToggle: () => {},
  selectByRowClick: false,
  highlighted: false,
  style: null,
  tableRow: undefined,
  forwardedRef: undefined,
};
