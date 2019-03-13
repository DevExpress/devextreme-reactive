import { withComponents } from '@devexpress/dx-react-core';
import { Appointments as AppointmentsBase } from '@devexpress/dx-react-scheduler';
import { AppointmentContent } from '../templates/appointment/appointment-content';
import { Appointment } from '../templates/appointment/appointment';

export const Appointments = withComponents({
  Appointment,
  AppointmentContent,
})(AppointmentsBase);
