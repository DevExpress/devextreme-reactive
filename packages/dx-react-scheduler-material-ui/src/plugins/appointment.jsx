import * as React from 'react';
import { Appointment as AppointmentBase } from '@devexpress/dx-react-scheduler';
import { Appointment as AppointmentComponent } from '../templates/appointment/appointment';

export class Appointment extends React.PureComponent {
  render() {
    return (
      <AppointmentBase
        appointmentComponent={AppointmentComponent}
        {...this.props}
      />
    );
  }
}
