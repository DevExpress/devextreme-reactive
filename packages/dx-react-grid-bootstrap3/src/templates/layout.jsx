import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Root = ({ children, className, ...restProps }) => (
  <div className={classNames('panel panel-default', className)}{...restProps}>
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Root.defaultProps = {
  children: undefined,
  className: undefined,
};
