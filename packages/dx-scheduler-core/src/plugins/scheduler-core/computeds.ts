import { PureComputed } from '@devexpress/dx-core';
import { AppointmentModel, Appointment, FormatDateTimeGetterFn, FormatterFn } from '../../types';
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

export const formatDateTimeGetter: FormatDateTimeGetterFn = (locale) => {
  const cache = new Map<Intl.DateTimeFormatOptions, Intl.DateTimeFormat>(); // any -> type

  const formatter: FormatterFn = (nextDate, nextOptions) => {
    if (nextDate === undefined) return '';
    const date = new Date(nextDate);
    let formatInstance = cache.get(nextOptions);

    if (!formatInstance) {
      formatInstance = dateTimeFormatInstance(locale, nextOptions);
      cache.set(nextOptions, formatInstance);
    }

    return formatInstance.format(date);
  };
  return formatter;
};
