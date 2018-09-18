import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Appointment } from './appointment';

const styles = {
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const HorizontalAppointmentBase = ({
  classes,
  getTitle,
  getStartDate,
  getEndDate,
  appointment,
  children,
  ...restProps
}) => (
  <Appointment
    appointment={appointment}
    {...restProps}
  >
    {children || (
      <div className={classes.title}>
        {getTitle(appointment)}
      </div>
    )}
  </Appointment>
);

HorizontalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointment: PropTypes.object.isRequired,
  children: PropTypes.node,
  getTitle: PropTypes.func,
  getStartDate: PropTypes.func,
  getEndDate: PropTypes.func,
};

HorizontalAppointmentBase.defaultProps = {
  children: undefined,
  getStartDate: () => {},
  getEndDate: () => {},
  getTitle: () => {},
};

export const HorizontalAppointment = withStyles(styles, { name: 'HorizontalAppointment' })(HorizontalAppointmentBase);
