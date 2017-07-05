import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Paper } from 'material-ui';

export const styleSheet = createStyleSheet('GridLayout', theme => ({
  headingPanel: {
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '12px',
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
  footerPanel: {
    padding: '12px',
  },
  root: {
    marginBottom: theme.spacing.unit * 3,
  },
}));

const RootBase = ({
  headerTemplate,
  bodyTemplate,
  footerTemplate,
  classes,
}) => (
  <Paper className={classes.root}>
    {headerTemplate()}
    {bodyTemplate()}
    {footerTemplate()}
  </Paper>
);

RootBase.propTypes = {
  headerTemplate: PropTypes.func.isRequired,
  bodyTemplate: PropTypes.func.isRequired,
  footerTemplate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Root = withStyles(styleSheet)(RootBase);

const HeaderBase = ({ children, classes }) =>
  children && <div className={classes.headingPanel}>{children}</div>;

HeaderBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

HeaderBase.defaultProps = {
  children: null,
};

export const Header = withStyles(styleSheet)(HeaderBase);

const FooterBase = ({ children, classes }) =>
  children && <div className={classes.footerPanel}>{children}</div>;

FooterBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

FooterBase.defaultProps = {
  children: null,
};

export const Footer = withStyles(styleSheet)(FooterBase);
