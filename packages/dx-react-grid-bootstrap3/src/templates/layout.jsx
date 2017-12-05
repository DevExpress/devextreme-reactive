import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Root = ({ children, className, ...restProps }) => (
  <div
    className={classNames('panel panel-default', className)}
    {...restProps}
  >
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

export const Header = ({ children, className, ...restProps }) =>
  children && <div className={classNames('panel-heading', className)} style={{ paddingBottom: '5px' }} {...restProps}>{children}</div>;

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
};

Header.defaultProps = {
  children: undefined,
  className: undefined,
};

export const Footer = ({ children, className, ...restProps }) =>
  children && <div className={classNames('panel-footer', className)} {...restProps}>{children}</div>;

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
};

Footer.defaultProps = {
  children: undefined,
  className: undefined,
};
