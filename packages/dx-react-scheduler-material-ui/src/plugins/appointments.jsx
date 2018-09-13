import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Appointments as AppointmentsBase } from '@devexpress/dx-react-scheduler';
import { HORIZONTAL_APPOINTMENT_TYPE, VERTICAL_APPOINTMENT_TYPE } from '@devexpress/dx-scheduler-core';
import { HorizontalAppointment } from '../templates/appointment/horizontal-appointment';
import { VerticalAppointment } from '../templates/appointment/vertical-appointment';

const Appointment = ({ type, ...restProps }) => (
  type === HORIZONTAL_APPOINTMENT_TYPE
    ? <HorizontalAppointment {...restProps} />
    : <VerticalAppointment {...restProps} />
);

Appointment.propTypes = {
  type: PropTypes.oneOf([
    HORIZONTAL_APPOINTMENT_TYPE,
    VERTICAL_APPOINTMENT_TYPE,
  ]).isRequired,
};

export class Appointments extends React.PureComponent {
  render() {
    return (
      <AppointmentsBase
        appointmentComponent={Appointment}
        {...this.props}
      />
    );
  }
}

Appointments.Appointment = Appointment;
