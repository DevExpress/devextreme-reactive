import moment from 'moment';
import {
  sliceAppointmentByDay,
  dayBoundaryPredicate,
  reduceAppointmentByDayBounds,
} from './helpers';
import {
  viewPredicate,
} from '../../utils';

export const calculateWeekDateIntervals = (
  appointments,
  leftBound, rightBound,
  excludedDays,
) => {
  debugger
  const a = appointments
    .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }));
  const b = a
    .filter(appointment => viewPredicate(appointment, leftBound, rightBound, excludedDays, true));
  const c = b
    .reduce((acc, appointment) => ([...acc, ...sliceAppointmentByDay(appointment)]), []);
  const d = c
    .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays));
  const e = d
    .map(appointment => reduceAppointmentByDayBounds(appointment, leftBound, rightBound));

  return e;
};
