import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel, AppointmentCore } from '../../types';

export const appointments: PureComputed<
  [AppointmentModel[]], AppointmentCore[]
> = data => data.map(appointment => ({
  start: appointment.startDate,
  end: appointment.endDate,
  ...appointment.allDay !== undefined && {
    allDay: appointment.allDay,
  },
  dataItem: appointment,
}));
