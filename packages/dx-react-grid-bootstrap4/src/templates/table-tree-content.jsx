import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './table-tree-content.css';

export const TableTreeContent = ({
  children, className, ...restProps
}) => (
  <div
    className={classNames('text-nowrap w-100 dx-rg-bs4-table-tree-content', className)}
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
