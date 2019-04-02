import moment from 'moment';
import {
  AppointmentMoment, CalculateAllDayDateIntervalsFn,
} from '../../types';
import { allDayPredicate, sliceAppointmentsByBoundaries } from './helpers';
import { viewPredicate } from '../../utils';

export const calculateAllDayDateIntervals: CalculateAllDayDateIntervalsFn = (
  appointments,
  leftBound, rightBound,
  excludedDays,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => (
    viewPredicate(appointment, leftBound, rightBound, excludedDays, false)
    && allDayPredicate(appointment)
  ))
  .reduce((acc, appointment) => ([
    ...acc,
    ...sliceAppointmentsByBoundaries(appointment, leftBound, rightBound, excludedDays),
  ]), [] as AppointmentMoment[]);
