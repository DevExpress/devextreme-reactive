import { PureComputed } from '@devexpress/dx-core';
import { Index, AppointmentChanges } from '../../types';

export const changedAppointmentById: PureComputed<
  [object, Index], AppointmentChanges
> = (changes, appointmentId) => (
  { [appointmentId]: changes }
);
