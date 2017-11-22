import React from 'react';
import PropTypes from 'prop-types';

export const Root = ({ children }) => (
  <div className="panel panel-default">
    {children}
  </div>
);

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Root.defaultProps = {
  children: undefined,
};

export const Header = ({ children }) =>
  children && <div className="panel-heading" style={{ paddingBottom: '5px' }}>{children}</div>;

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Header.defaultProps = {
  children: undefined,
};

export const Footer = ({ children }) =>
  children && <div className="panel-footer">{children}</div>;

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Footer.defaultProps = {
  children: undefined,
};
