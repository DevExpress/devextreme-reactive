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
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, excludedDays, true))
  .reduce((acc, appointment) => ([...acc, ...sliceAppointmentByDay(appointment)]), [])
  .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays))
  .map(appointment => reduceAppointmentByDayBounds(appointment, leftBound, rightBound));
