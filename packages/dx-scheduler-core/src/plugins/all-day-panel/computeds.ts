import * as moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import { AppointmentCore, LeftBound, RightBound, ExcludedDays } from '../../types';
import { allDayPredicate, sliceAppointmentsByBoundaries } from './helpers';
import { viewPredicate } from '../../utils';

export const calculateAllDayDateIntervals: PureComputed<
  [AppointmentCore[], LeftBound, RightBound, ExcludedDays]
> = (
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
  ]), []);
