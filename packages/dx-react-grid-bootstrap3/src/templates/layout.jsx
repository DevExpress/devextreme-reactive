import React from 'react';
import PropTypes from 'prop-types';

export const Root = ({
  headerTemplate,
  bodyTemplate,
  footerTemplate,
}) => (
  <div className="panel panel-default">
    {headerTemplate()}
    {bodyTemplate()}
    {footerTemplate()}
  </div>
);

Root.propTypes = {
  headerTemplate: PropTypes.func.isRequired,
  bodyTemplate: PropTypes.func.isRequired,
  footerTemplate: PropTypes.func.isRequired,
};

export const Header = ({ children }) =>
  children && <div className="panel-heading" style={{ paddingBottom: '5px' }}>{children}</div>;

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export const Footer = ({ children }) =>
  children && <div className="panel-footer">{children}</div>;

Footer.propTypes = {
  children: PropTypes.node,
};

Footer.defaultProps = {
  children: null,
};
