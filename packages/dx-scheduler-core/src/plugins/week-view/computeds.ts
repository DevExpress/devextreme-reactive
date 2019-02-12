import moment from 'moment';
import { CalculateWeekDateIntervalsFn, AppointmentMoment } from '../../types';
import {
  sliceAppointmentByDay, dayBoundaryPredicate, reduceAppointmentByDayBounds,
} from './helpers';
import { viewPredicate } from '../../utils';

export const calculateWeekDateIntervals: CalculateWeekDateIntervalsFn = (
  appointments,
  leftBound, rightBound,
  excludedDays,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, excludedDays, true))
  .reduce((acc, appointment) => (
    [...acc, ...sliceAppointmentByDay(appointment)]), [] as AppointmentMoment[],
  )
  .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays))
  .map(appointment => reduceAppointmentByDayBounds(appointment, leftBound, rightBound));
