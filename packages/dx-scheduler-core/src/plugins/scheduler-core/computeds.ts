import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel, Appointment } from '../../types';
import { dateTimeFormatInstance } from './helpers';

export const appointments: PureComputed<
  [AppointmentModel[]], Appointment[]
> = data => data.map(appointment => ({
  start: appointment.startDate,
  end: appointment.endDate,
  ...appointment.allDay !== undefined && {
    allDay: appointment.allDay,
  },
  ...appointment.rRule !== undefined && {
    rRule: appointment.rRule,
  },
  ...appointment.exDate !== undefined && {
    exDate: appointment.exDate,
  },
  dataItem: appointment,
}));

export const dateTimeFormatComputed: any = (locale: string | string[]) => {
  const cache = new Map();

  const formatter = (nextDate: Date | string | number, nextOptions: Intl.DateTimeFormatOptions) => {
    if (nextDate === undefined) return;
    const date = (typeof nextDate) === 'object' ? nextDate : new Date(nextDate);
    const key = JSON.stringify(nextOptions);

    if (cache.has(key)) {
      return cache.get(key).format(date);
    }

    const formatInstance = dateTimeFormatInstance(locale, nextOptions);
    cache.set(key, formatInstance);
    return formatInstance.format(date);
  };
  return formatter;
};
