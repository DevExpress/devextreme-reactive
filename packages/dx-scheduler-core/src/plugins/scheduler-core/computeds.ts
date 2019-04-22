import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel, Appointment } from '../../types';

export const appointments: PureComputed<
  [AppointmentModel[]], Appointment[]
> = data => data.map(appointment => ({
  start: appointment.startDate,
  end: appointment.endDate,
  ...appointment.allDay !== undefined && {
    allDay: appointment.allDay,
  },
  dataItem: appointment,
}));

const dateTimeFormatInstance = (locale: any, formatOptions: any) => {
  return new Intl.DateTimeFormat(locale, formatOptions);
};

export const dateTimeFormat: any = (local: string) => {
  const cache = new Map();

  const formatter = (nextDate: Date, nextOptions: any) => {
    if (nextDate === undefined) return;
    const key = JSON.stringify(nextOptions) + local;

    if (cache.has(key)) {
      return cache.get(key).format(nextDate);
    }

    const formatInstance = dateTimeFormatInstance(local, nextOptions);
    cache.set(key, formatInstance);
    return formatInstance.format(nextDate);
  };
  return formatter;
};
