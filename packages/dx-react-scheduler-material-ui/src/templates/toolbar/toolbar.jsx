import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import ToolbarMUI from '@mui/material/Toolbar';
import withStyles from '@mui/styles/withStyles';
import { getBorder } from '../utils';

const styles = theme => ({
  toolbar: {
    borderBottom: getBorder(theme),
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
