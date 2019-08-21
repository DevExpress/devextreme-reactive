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

const styles = ({ spacing, palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: spacing(3),
    paddingLeft: spacing(2),
    paddingRight: spacing(2.875),
    position: 'sticky',
    top: 0,
    backgroundColor: palette.background.paper,
    zIndex: 1,
  },
  basic: {
    maxWidth: '650px',
    paddingRight: 0,
    paddingLeft: 0,
    '@media (max-width: 700px)': {
      paddingRight: spacing(2.875),
      paddingLeft: spacing(2),
    },
  },
  recurring: {
    maxWidth: '1150px',
  },
});

const LayoutBase = ({
  commandButtonComponent: CommandButton,
  commitAppointment,
  cancelCommit,
  deleteAppointment,
  getMessage,
  children,
  classes,
  className,
  isRecurring,
  readOnly,
  ...restProps
}) => (
  <Grid
    className={classNames({
      [classes.root]: true,
      [classes.basic]: !isRecurring,
      [classes.recurring]: isRecurring,
    }, className)}
    container
    alignItems="center"
    {...restProps}
  >
    <CommandButton
      onExecute={cancelCommit}
      getMessage={getMessage}
      id={CANCEL_BUTTON}
    />
    {!readOnly && (
      <React.Fragment>
        <CommandButton
          onExecute={deleteAppointment}
          getMessage={getMessage}
          id={DELETE_BUTTON}
        />
        <CommandButton
          getMessage={getMessage}
          onExecute={commitAppointment}
          id={SAVE_BUTTON}
        />
      </React.Fragment>
    )}
    {children}
  </Grid>
);

LayoutBase.propTypes = {
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  commitAppointment: PropTypes.func.isRequired,
  cancelCommit: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  className: PropTypes.string,
  isRecurring: PropTypes.bool,
  readOnly: PropTypes.bool,
};

LayoutBase.defaultProps = {
  className: undefined,
  children: undefined,
  isRecurring: false,
  readOnly: false,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
