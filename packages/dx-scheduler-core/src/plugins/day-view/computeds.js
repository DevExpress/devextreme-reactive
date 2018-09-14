import moment from 'moment';
import { sliceAppointmentByBoundaries } from './helpers';
import {
  viewPredicate,
} from '../../utils';

export const calculateDayViewDateIntervals = (
  appointments,
  leftBound, rightBound,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, [], true))
  .reduce((acc, appointment) => ([
    ...acc, ...sliceAppointmentByBoundaries(appointment, leftBound, rightBound),
  ]), []);
