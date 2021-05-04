import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import ToolbarMUI from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';
import { withKeyboardNavigation } from '../../utils/with-keyboard-navigation';

const styles = theme => ({
  toolbar: {
    borderBottom: getBorder(theme),
    flex: 'none',
  },
});

const ToolbarBase = ({
  children, classes, className, style, refComponent, setRefForKeyboardNavigation, ...restProps
}) => (
  <ToolbarMUI
    style={style}
    className={classNames(classes.toolbar, className)}
    ref={refComponent}
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

export const Toolbar = withKeyboardNavigation('toolbar', 'none', true)(withStyles(styles, { name: 'Toolbar' })(ToolbarBase));
