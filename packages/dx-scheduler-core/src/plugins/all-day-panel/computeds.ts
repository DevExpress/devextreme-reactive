import moment from 'moment';
import {
  AppointmentMoment, CalculateAllDayDateAndGroupIntervalsFn,
} from '../../types';
import { allDayPredicate, sliceAppointmentsByBoundaries } from './helpers';
import { filterByViewBoundaries, expandGroupedAppointment } from '../../utils';

export const calculateAllDayDateAndGroupIntervals: CalculateAllDayDateAndGroupIntervalsFn = (
  appointments,
  leftBound, rightBound,
  excludedDays, grouping, resources,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .reduce((acc, appointment) =>
    [...acc, ...filterByViewBoundaries(appointment, leftBound, rightBound, excludedDays, false)],
    [] as AppointmentMoment[],
  )
  .filter(appointment => allDayPredicate(appointment))
  .reduce((acc, appointment) =>
    [...acc, ...expandGroupedAppointment(appointment, grouping, resources)],
    [] as AppointmentMoment[],
  )
  .reduce((acc, appointment) => ([
    ...acc,
    ...sliceAppointmentsByBoundaries(appointment, leftBound, rightBound, excludedDays),
  ]), [] as AppointmentMoment[]);
