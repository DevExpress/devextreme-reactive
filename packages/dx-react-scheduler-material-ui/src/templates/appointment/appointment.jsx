import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  appointment: {
    position: 'absolute',
    display: 'block',
    backgroundColor: theme.palette.primary[300],
    borderLeft: getBorderColor(theme),
    ...theme.typography.caption,
    '&:hover': {
      backgroundColor: theme.palette.primary[400],
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[100],
      outline: 0,
    },
  },
});

const AppointmentBase = ({
  classes,
  children,
  title,
  top,
  left,
  width,
  height,
  ...restProps
}) => (
  <div
    className={classes.appointment}
    style={{
      top, left, width, height,
    }}
    {...restProps}
  >
    {children || (
      <span>
        {title}
      </span>
    )}
  </div>
);

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

AppointmentBase.defaultProps = {
  children: null,
  title: '',
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
