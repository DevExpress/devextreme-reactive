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

export const Heading = ({ content }) =>
  <div className="panel-heading">{content}</div>;

Heading.propTypes = {
  content: PropTypes.node.isRequired,
};

export const Footer = ({ content }) =>
  <div className="panel-footer">{content}</div>;

Footer.propTypes = {
  content: PropTypes.node.isRequired,
};
