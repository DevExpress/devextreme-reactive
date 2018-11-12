import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Root = ({ children, className, ...restProps }) => (
  <div
    className={classNames('d-flex flex-column position-relative', className)}
    {...restProps}
  >
    {children}
  </div>
);

Root.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Root.defaultProps = {
  className: undefined,
  children: undefined,
};
