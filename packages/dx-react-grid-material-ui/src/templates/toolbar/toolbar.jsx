import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import ToolbarMUI from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { getBorder } from '../utils';

const styles = theme => ({
  toolbar: {
    borderBottom: getBorder(theme),
    flex: 'none',
  },
});

const ToolbarBase = ({
  children, classes, className, style, refObject,
  updateRefForKeyboardNavigation, setFocusedElement, ...restProps
}) => (
  <ToolbarMUI
    style={style}
    className={classNames(classes.toolbar, className)}
    ref={refObject}
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
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const Toolbar = withKeyboardNavigation('toolbar', 'none')(withStyles(styles, { name: 'Toolbar' })(ToolbarBase));
