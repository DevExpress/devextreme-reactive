import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper } from 'material-ui';

const styles = theme => ({
  headingPanel: {
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '12px',
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
  footerPanel: {
    padding: '12px',
  },
});

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
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

HeaderBase.defaultProps = {
  children: null,
};

export const Header = withStyles(styles, { name: 'GridLayout' })(HeaderBase);

const FooterBase = ({ children, classes }) =>
  children && <div className={classes.footerPanel}>{children}</div>;

FooterBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

FooterBase.defaultProps = {
  children: null,
};

export const Footer = withStyles(styles, { name: 'GridLayout' })(FooterBase);
