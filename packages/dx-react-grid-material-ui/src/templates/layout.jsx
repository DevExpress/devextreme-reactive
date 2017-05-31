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

const HeaderBase = ({ children, classes }) =>
  children && <div className={classes.headingPanel}>{children}</div>;

HeaderBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Header = withStyles(styleSheet)(HeaderBase);

export const FooterBase = ({ children, classes }) =>
  children && <div className={classes.footerPanel}>{children}</div>;

FooterBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Footer = withStyles(styleSheet)(FooterBase);

