import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const HeaderBase = ({
  children, classes,
  className, ...restProps
}) =>
  children &&
    <div className={classNames(classes.headingPanel, className)} {...restProps}>{children}</div>;

HeaderBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

HeaderBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const Header = withStyles(styles, { name: 'GridLayout' })(HeaderBase);

const FooterBase = ({
  children, classes,
  className, ...restProps
}) =>
  children &&
    <div className={classNames(classes.footerPanel, className)} {...restProps}>{children}</div>;

FooterBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

FooterBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const Footer = withStyles(styles, { name: 'GridLayout' })(FooterBase);
