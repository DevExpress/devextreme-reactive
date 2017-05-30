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
  content && <div className="panel-heading">{content}</div>;

export const Footer = ({ content }) =>
  content && <div className="panel-footer">{content}</div>;
