import { CalculateWeekDateIntervalsFn, AppointmentMoment } from '../../types';
import {
  sliceAppointmentByDay, dayBoundaryPredicate, reduceAppointmentByDayBounds,
  normalizeAppointmentDuration,
} from './helpers';
import { filterByViewBoundaries, expandGroupedAppointments } from '../../utils';

export const calculateWeekDateIntervals: CalculateWeekDateIntervalsFn = (
  appointments,
  leftBound, rightBound, // startViewDate, endViewDate
  excludedDays,
  cellDuration,
  grouping, resources,
) => {
  const result1 = appointments
    .map(appointment => normalizeAppointmentDuration(appointment, cellDuration))
    .reduce((acc, appointment) =>
      [...acc, ...filterByViewBoundaries(appointment, leftBound, rightBound, excludedDays, true)],
      [] as AppointmentMoment[],
    );
  const result2 = expandGroupedAppointments(result1, grouping, resources);
  const result3 = result2
    .reduce((acc, appointment) => (
      [...acc, ...sliceAppointmentByDay(appointment, cellDuration)]), [] as AppointmentMoment[],
    )
    .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays))
    .map(appointment => reduceAppointmentByDayBounds(
      appointment, leftBound, rightBound, cellDuration,
    ));

  return result3;
};
