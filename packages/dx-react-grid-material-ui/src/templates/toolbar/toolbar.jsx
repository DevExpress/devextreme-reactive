import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import ToolbarMUI from '@mui/material/Toolbar';
import withStyles from '@mui/styles/withStyles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { getBorder } from '../utils';

const styles = theme => ({
  toolbar: {
    borderBottom: getBorder(theme),
    flex: 'none',
  },
});

const ToolbarBase = ({
  children, classes, className, style, forwardedRef, ...restProps
}) => (
  <ToolbarMUI
    style={style}
    className={classNames(classes.toolbar, className)}
    ref={forwardedRef}
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
  forwardedRef: PropTypes.object,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
  forwardedRef: undefined,
};

export const Toolbar = withKeyboardNavigation('toolbar', 'none')(withStyles(styles, { name: 'Toolbar' })(ToolbarBase));
