import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSelectRow = ({
  selected,
  children,
  style,
  onToggle,
  selectByRowClick,
  className,
}) => (
  <tr
    style={style}
    className={classNames({
      'table-active': selected,
    }, className)}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
  >
    {children}
  </tr>
);

TableSelectRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onToggle: PropTypes.func,
  selectByRowClick: PropTypes.bool,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

TableSelectRow.defaultProps = {
  children: null,
  className: undefined,
  onToggle: () => {},
  selectByRowClick: false,
  selected: false,
  style: null,
};
