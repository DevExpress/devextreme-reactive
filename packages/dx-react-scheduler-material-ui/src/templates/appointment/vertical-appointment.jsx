import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Appointment } from './appointment';

const styles = {
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const VerticalAppointmentBase = ({
  classes,
  getAppointmentTitle,
  getAppointmentStartDate, getAppointmentEndDate,
  appointment,
  children,
  ...restProps
}) => (
  <Appointment
    appointment={appointment}
    {...restProps}
  >
    {children || (
    <React.Fragment>
      <div className={classes.title}>
        {getAppointmentTitle(appointment)}
      </div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {moment(getAppointmentStartDate(appointment)).format('h:mm A')}
        </div>
        <div className={classes.time}>
          {' - '}
        </div>
        <div className={classes.time}>
          {moment(getAppointmentEndDate(appointment)).format('h:mm A')}
        </div>
      </div>
    </React.Fragment>
    )}
  </Appointment>
);

VerticalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointment: PropTypes.object.isRequired,
  getAppointmentTitle: PropTypes.func,
  getAppointmentStartDate: PropTypes.func,
  getAppointmentEndDate: PropTypes.func,
  children: PropTypes.node,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  getAppointmentStartDate: () => { },
  getAppointmentEndDate: () => { },
  getAppointmentTitle: () => { },
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
