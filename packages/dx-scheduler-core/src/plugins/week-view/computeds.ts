import moment from 'moment';
import { RRule, RRuleSet } from 'rrule';
import { PureComputed } from '@devexpress/dx-core';
import { CalculateWeekDateIntervalsFn, AppointmentMoment } from '../../types';
import {
  sliceAppointmentByDay, dayBoundaryPredicate, reduceAppointmentByDayBounds,
} from './helpers';
import { intervalDuration } from '../drag-drop-provider/helpers';
import { viewPredicate } from '../../utils';

// rRule
// exDate

export const recurringConvert = (appts: any[]) => {
  appts.reduce((acc, appointment) => {
    if (appointment.rRule) {
      const dates = appointment.rRule.all();
      const appointmentDuration = intervalDuration(appointment.dataItem, 'minutes');
      const recAppts = dates.map((startDate: string) => ({
        ...appointment,
        startDate: new Date(startDate),
        endDate: moment(startDate).add(appointmentDuration, 'minutes').toDate(),
      }));
      return [...acc, ...recAppts];
    }
    return [...acc, appointment];
  }, []);
};

export const recurringViewPredicate: PureComputed<
  [any, Date, Date], AppointmentMoment[]
> = (appointment, leftBound, rightBound) => {
  if (appointment.rRule === undefined) return [appointment];
  const rruleSet = new RRuleSet();
  const options = {
    ...RRule.parseString(appointment.rRule),
    dtstart: moment(appointment.start).toDate(), // toUTCString() ???
  };
  rruleSet.rrule(new RRule(options));
  debugger
  if (appointment.exDate) {
    rruleSet.exdate(appointment.exDate);
  }
  const datesInBoundaries = rruleSet.between(leftBound as Date, rightBound as Date);
  if (datesInBoundaries.length === 0) return [];

  const appointmentDuration = moment(appointment.end as Date)
    .diff(appointment.start as Date, 'minutes');
  return datesInBoundaries.map((startDate: any) => ({
    ...appointment,
    start: moment(startDate),
    end: moment(startDate).add(appointmentDuration, 'minutes'),
  }));
};

export const calculateWeekDateIntervals: CalculateWeekDateIntervalsFn = (
  appointments,
  leftBound, rightBound,
  excludedDays,
) => {
  const a = appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }));
  const b = a
  .reduce((acc, appointment) =>
    [...acc, ...recurringViewPredicate(appointment, leftBound, rightBound)],
    [] as AppointmentMoment[],
  );
  const c = b
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, excludedDays, true));
  const d = c
  .reduce((acc, appointment) => (
    [...acc, ...sliceAppointmentByDay(appointment)]), [] as AppointmentMoment[],
  );
  const e = d.filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays));
  const i = e.map(appointment => reduceAppointmentByDayBounds(appointment, leftBound, rightBound));
  return i;
};
