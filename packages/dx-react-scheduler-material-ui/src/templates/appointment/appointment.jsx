import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  appointment: {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
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
  getTitle,
  getStartDate,
  getEndDate,
  appointment,
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
      <div>
        <p>
          {getTitle(appointment)}
        </p>
        <span>
          {moment(getStartDate(appointment)).format('D MMM H:mmA')}
        </span>
        -
        <span>
          {moment(getEndDate(appointment)).format('D MMM H:mmA')}
        </span>
      </div>
    )}
  </div>
);

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  getTitle: PropTypes.func,
  getStartDate: PropTypes.func,
  getEndDate: PropTypes.func,
  appointment: PropTypes.object,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

AppointmentBase.defaultProps = {
  children: null,
  getTitle: undefined,
  getStartDate: undefined,
  getEndDate: undefined,
  appointment: undefined,
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
