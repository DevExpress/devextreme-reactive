import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableTreeContent = ({
  children, className, ...restProps
}) => (
  <div
    className={classNames('w-100 dx-g-bs4-table-tree-content', className)}
    {...restProps}
  >
    {children}
  </div>
);

TableTreeContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

TableTreeContent.defaultProps = {
  className: undefined,
  children: undefined,
};
