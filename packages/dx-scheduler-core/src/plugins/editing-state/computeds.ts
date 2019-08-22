import { PureComputed } from '@devexpress/dx-core';
import { AppointmentId, AppointmentChanges, Changes } from '../../types';

export const changedAppointmentById: PureComputed<
  [Changes, AppointmentId], AppointmentChanges
> = (changes, appointmentId) => (
  { [appointmentId]: changes }
);
