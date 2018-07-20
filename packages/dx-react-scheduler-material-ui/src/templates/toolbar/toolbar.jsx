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
  children, classes, className, ...restProps
}) => (
  <ToolbarMUI
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
};

ToolbarBase.defaultProps = {
  className: undefined,
};

export const Toolbar = withStyles(styles, { name: 'Toolbar' })(ToolbarBase);
