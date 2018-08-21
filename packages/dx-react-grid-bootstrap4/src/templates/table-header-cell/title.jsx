import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Title = ({
  children, className, ...restProps
}) => (
  <div
    className={classNames('dx-rg-bs4-table-header-titlt', className)}
    {...restProps}
  >
    {children}
  </div>
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
