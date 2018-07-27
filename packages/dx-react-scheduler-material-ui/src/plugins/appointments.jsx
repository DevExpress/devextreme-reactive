import * as React from 'react';
import { Appointments as AppointmentsBase } from '@devexpress/dx-react-scheduler';
import { Container } from '../templates/appointment/container';
import {
  HorizontalAppointment,
  VerticalAppointment,
} from '../templates/appointment/appointments';

export class Appointments extends React.PureComponent {
  render() {
    return (
      <AppointmentsBase
        horizontalAppointmentComponent={HorizontalAppointment}
        verticalAppointmentComponent={VerticalAppointment}
        containerComponent={Container}
        {...this.props}
      />
    );
  }
}
