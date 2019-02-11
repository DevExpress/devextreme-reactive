import { PureComputed } from '@devexpress/dx-core';
import { AppointmentId, AppointmentChanges } from '../../types';

export const changedAppointmentById: PureComputed<
  [object, AppointmentId], AppointmentChanges
> = (changes, appointmentId) => (
  { [appointmentId]: changes }
);
