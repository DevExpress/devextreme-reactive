import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(1),
  },
});

const LayoutBase = ({
  controlButtonComponent: ControlButton,
  commitAppointment,
  cancelCommit,
  deleteAppointment,
  getMessage,
  children,
  classes,
  className,
  ...restProps
}) => (
  <Grid
    className={classNames(classes.root, className)}
    container
    alignItems="center"
    {...restProps}
  >
    <ControlButton
      onExecute={cancelCommit}
      getMessage={getMessage}
      id={CANCEL_BUTTON}
    />
    <ControlButton
      onExecute={deleteAppointment}
      getMessage={getMessage}
      id={DELETE_BUTTON}
    />
    <ControlButton
      getMessage={getMessage}
      onExecute={commitAppointment}
      id={SAVE_BUTTON}
    />
    {children}
  </Grid>
);

LayoutBase.propTypes = {
  controlButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  commitAppointment: PropTypes.func.isRequired,
  cancelCommit: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LayoutBase.defaultProps = {
  className: undefined,
  children: undefined,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
