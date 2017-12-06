import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

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

export const Root = ({ children, ...restProps }) => (
  <div {...restProps}>{children}</div>
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

const HeaderBase = ({ children, classes }) =>
  !!children &&
    <div className={classes.headingPanel}>{children}</div>;

HeaderBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  classes: PropTypes.object.isRequired,
};

HeaderBase.defaultProps = {
  children: undefined,
};

export const Header = withStyles(styles, { name: 'GridLayout' })(HeaderBase);

const FooterBase = ({
  children, classes,
}) =>
  !!children &&
    <div className={classes.footerPanel}>{children}</div>;

FooterBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  classes: PropTypes.object.isRequired,
};

FooterBase.defaultProps = {
  children: undefined,
};

export const Footer = withStyles(styles, { name: 'GridLayout' })(FooterBase);
