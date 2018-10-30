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
  appointmentMapping,
  data,
  children,
  ...restProps
}) => (
  <Appointment
    data={data}
    {...restProps}
  >
    {children || (
      <div className={classes.title}>
        {appointmentMapping(data).title}
      </div>
    )}
  </Appointment>
);

HorizontalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  appointmentMapping: PropTypes.func,
  children: PropTypes.node,
};

HorizontalAppointmentBase.defaultProps = {
  appointmentMapping: () => undefined,
  children: undefined,
};

export const HorizontalAppointment = withStyles(styles, { name: 'HorizontalAppointment' })(HorizontalAppointmentBase);
