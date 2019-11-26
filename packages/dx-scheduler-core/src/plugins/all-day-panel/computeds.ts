import moment from 'moment';
import {
  AppointmentMoment, CalculateAllDayDateIntervalsFn,
} from '../../types';
import { allDayPredicate, sliceAppointmentsByBoundaries } from './helpers';
import { filterByViewBoundaries, expandGroupedAppointments } from '../../utils';

export const calculateAllDayDateIntervals: CalculateAllDayDateIntervalsFn = (
  appointments,
  leftBound, rightBound,
  excludedDays, grouping, resources,
) => {
  const result1 = appointments
    .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
    .reduce((acc, appointment) =>
      [...acc, ...filterByViewBoundaries(appointment, leftBound, rightBound, excludedDays, false)],
      [] as AppointmentMoment[],
    )
    .filter(appointment => allDayPredicate(appointment))
  return expandGroupedAppointments(result1, grouping, resources)
    .reduce((acc, appointment) => ([
      ...acc,
      ...sliceAppointmentsByBoundaries(appointment, leftBound, rightBound, excludedDays),
    ]), [] as AppointmentMoment[]);
};
