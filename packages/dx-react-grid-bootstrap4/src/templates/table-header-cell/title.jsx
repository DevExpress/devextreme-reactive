import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Title = ({
  children, className, ...restProps
}) => (
  <span
    className={classNames('dx-rg-bs4-table-header-title', className)}
    {...restProps}
  >
    {children}
  </span>
);

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

Title.defaultProps = {
  className: null,
  children: undefined,
};
