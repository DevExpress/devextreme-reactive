import * as React from 'react';
import { Appointments as AppointmentsBase } from '@devexpress/dx-react-scheduler';
import { Appointment as AppointmentComponent } from '../templates/appointment/appointment';
import { Container } from '../templates/appointment/container';

export class Appointments extends React.PureComponent {
  render() {
    return (
      <AppointmentsBase
        appointmentComponent={AppointmentComponent}
        containerComponent={Container}
        {...this.props}
      />
    );
  }
}

Appointments.Appointment = AppointmentComponent;
