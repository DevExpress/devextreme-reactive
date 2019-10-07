import moment from 'moment';
import { CalculateWeekDateIntervalsFn, AppointmentMoment } from '../../types';
import {
  sliceAppointmentByDay, dayBoundaryPredicate, reduceAppointmentByDayBounds,
} from './helpers';
import { filterByViewBoundaries } from '../../utils';

export const calculateWeekDateIntervals: CalculateWeekDateIntervalsFn = (
  appointments,
  leftBound, rightBound, // startViewDate, endViewDate
  excludedDays,
) => {
  // const a = appointments
  //   .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }));
  // const a1 = a.map(normalizeAppointmentDuration);

  const a = appointments.reduce((acc, appointment) =>
    [...acc, ...normalizeAppointmentDuration(appointment)],
    [],
  );

  const b = a.reduce((acc, appointment) =>
    [...acc, ...filterByViewBoundaries(appointment, leftBound, rightBound, excludedDays, true)],
    [] as AppointmentMoment[],
  );

  const c = b.reduce((acc, appointment) => (
    [...acc, ...sliceAppointmentByDay(appointment)]), [] as AppointmentMoment[],
  );

  const d = c
    .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays));

  const e = d.map(appointment => reduceAppointmentByDayBounds(appointment, leftBound, rightBound));

  // const f = e.map(normalizeAppointmentDuration);

  return e;
};

const normalizeAppointmentDuration = (appointment, cellDuration) => {
  const MINIMAL_DURATION = 15;

  if (moment(appointment.end).diff(appointment.start, 'minutes') > MINIMAL_DURATION - 1) {
    return [{ ...appointment, start: moment(appointment.start), end: moment(appointment.end) }];
  }

  if (moment(appointment.end).isSame(moment(appointment.start).add(MINIMAL_DURATION, 'minutes'), 'day')) {
    return [{ ...appointment, start: moment(appointment.start), end: moment(appointment.start).add(MINIMAL_DURATION, 'minutes'), short: true }];
  }
  return [{ ...appointment, start: moment(appointment.start).endOf('day').add(-MINIMAL_DURATION, 'minutes'), end: moment(appointment.start).endOf('day'), short: true }];
};
