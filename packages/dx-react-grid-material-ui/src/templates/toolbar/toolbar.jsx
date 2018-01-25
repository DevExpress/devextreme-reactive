import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ToolbarMUI from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import { darken, fade, lighten } from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  toolbar: {
    borderBottom: `1px solid ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.8)
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
