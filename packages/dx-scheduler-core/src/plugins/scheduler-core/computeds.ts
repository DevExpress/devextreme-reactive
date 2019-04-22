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

const dateTimeFormatInstance: any = (
  locale: string | string[], formatOptions: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, formatOptions);

export const dateTimeFormat: any = (locale: string | string[]) => {
  const cache = new Map();

  const formatter = (nextDate: Date, nextOptions: Intl.DateTimeFormatOptions) => {
    if (nextDate === undefined) return;
    const key = JSON.stringify(nextOptions) + locale;

    if (cache.has(key)) {
      return cache.get(key).format(nextDate);
    }

    const formatInstance = dateTimeFormatInstance(locale, nextOptions);
    cache.set(key, formatInstance);
    return formatInstance.format(nextDate);
  };
  return formatter;
};
