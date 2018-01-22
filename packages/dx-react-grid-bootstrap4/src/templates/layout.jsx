import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Root = ({ children, className, ...restProps }) => (
  <div className={classNames('card', className)}{...restProps}>
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
};

Root.defaultProps = {
  children: undefined,
  className: undefined,
};
