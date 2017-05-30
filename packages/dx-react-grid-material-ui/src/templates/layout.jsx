import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Paper } from 'material-ui';

const styleSheet = createStyleSheet('GridLayout', theme => ({
  headingPanel: {
    padding: '12px',
    backgroundColor: theme.palette.text.lightDivider,
  },
  footerPanel: {
    padding: '12px',
    backgroundColor: theme.palette.text.lightDivider,
  },
}));

export const Root = ({
  headerTemplate,
  bodyTemplate,
  footerTemplate,
}) => (
  <Paper>
    {headerTemplate()}
    {bodyTemplate()}
    {footerTemplate()}
  </Paper>
);

Root.propTypes = {
  headerTemplate: PropTypes.func.isRequired,
  bodyTemplate: PropTypes.func.isRequired,
  footerTemplate: PropTypes.func.isRequired,
};

const HeadingBase = ({ content, classes }) =>
  <div className={classes.headingPanel}>{content}</div>;

HeadingBase.propTypes = {
  content: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Heading = withStyles(styleSheet)(HeadingBase);

export const FooterBase = ({ content, classes }) =>
  <div className={classes.footerPanel}>{content}</div>;

FooterBase.propTypes = {
  content: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Footer = withStyles(styleSheet)(FooterBase);

