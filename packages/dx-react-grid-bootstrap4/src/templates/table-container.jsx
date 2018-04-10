import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableContainer = ({ children, className, ...restProps }) => (
  <div
    className={classNames('table-responsive dx-g-bs4-table-container', className)}
    {...restProps}
  >
    {children}
  </div>
);

TableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

TableContainer.defaultProps = {
  className: undefined,
};
