import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Toolbar as ToolbarMUI } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { darken, fade, lighten } from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  toolbar: {
    paddingTop: theme.spacing.unit * 1.5,
    borderBottom: `1px solid ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.text.lightDivider, 1), 0.925)
        : darken(fade(theme.palette.text.lightDivider, 1), 0.685)
    }`,
  },
});

const ToolbarBase = ({
  children, classes, className, style, ...restProps
}) => (
  <ToolbarMUI
    style={style}
    className={classNames(classes.toolbar, className)}
    {...restProps}
  >
    {children}
  </ToolbarMUI>
);

ToolbarBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
};


export const Toolbar = withStyles(styles, { name: 'Toolbar' })(ToolbarBase);
