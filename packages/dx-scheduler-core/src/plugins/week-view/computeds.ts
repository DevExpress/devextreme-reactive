import { CalculateWeekDateIntervalsFn, AppointmentMoment } from '../../types';
import {
  sliceAppointmentByDay, dayBoundaryPredicate, reduceAppointmentByDayBounds,
  normalizeAppointmentDuration,
} from './helpers';
import { filterByViewBoundaries } from '../../utils';

export const calculateWeekDateIntervals: CalculateWeekDateIntervalsFn = (
  appointments,
  leftBound, rightBound, // startViewDate, endViewDate
  excludedDays,
  cellDuration,
) => appointments
  .map(appointment => normalizeAppointmentDuration(appointment, cellDuration))
  .reduce((acc, appointment) =>
    [...acc, ...filterByViewBoundaries(appointment, leftBound, rightBound, excludedDays, true)],
    [] as AppointmentMoment[],
  )
  .reduce((acc, appointment) => (
    [...acc, ...sliceAppointmentByDay(appointment, cellDuration)]), [] as AppointmentMoment[],
  )
  .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays))
  .map(appointment => reduceAppointmentByDayBounds(
    appointment, leftBound, rightBound, cellDuration,
  ));
