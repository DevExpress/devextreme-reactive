import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import ToolbarMUI from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  toolbar: {
    borderBottom: getBorderColor(theme),
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
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
};


export const Toolbar = withStyles(styles, { name: 'Toolbar' })(ToolbarBase);
