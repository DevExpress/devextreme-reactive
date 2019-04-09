import { withComponents } from '@devexpress/dx-react-core';
import { Appointments as AppointmentsBase } from '@devexpress/dx-react-scheduler';
import { AppointmentContent } from '../templates/appointment/appointment-content';
import { Appointment } from '../templates/appointment/appointment';
import { RecurringIcon } from '../templates/appointment/recurring-icon';
import { SplitIndicator } from '../templates/appointment/split-indicator';
import { AppointmentContainer as Container } from '../templates/appointment/appointment-container';

export const Appointments = withComponents({
  Appointment,
  AppointmentContent,
  Container,
  SplitIndicator,
  RecurringIcon,
})(AppointmentsBase);
