import moment from 'moment';
import { allDayPredicate, getAllDayRects } from './helpers';
import {
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
  viewPredicate,
  sortAppointments,
} from '../../utils';
import {
  dayBoundaryPredicate,
} from '../week-view/helpers';
import {
  HORIZONTAL_APPOINTMENT_TYPE,
} from '../../constants';

const toPercentage = (value, total) => (value * 100) / total;

const calculateDateIntervals = (
  appointments,
  leftBound, rightBound,
  excludedDays,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, excludedDays, false))
  .filter(appointment => allDayPredicate(appointment))
  // slice by boundaries
  .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays));

const calculateRectsByDateIntervals = (
  intervals,
  dayScale,
  cellElements,
) => {
  const sorted = sortAppointments(intervals);
  const grouped = findOverlappedAppointments(sorted);

  return unwrapGroups(adjustAppointments(grouped))
    .map((appointment) => {
      const {
        top, left,
        width, height,
        parentWidth,
      } = getAllDayRects(
        appointment.start, appointment.end,
        dayScale,
        cellElements,
      );
      const widthInPx = width / appointment.reduceValue;
      return {
        top,
        height,
        left: toPercentage(left + (widthInPx * appointment.offset), parentWidth),
        width: toPercentage(widthInPx, parentWidth),
        dataItem: appointment.dataItem,
        type: HORIZONTAL_APPOINTMENT_TYPE,
      };
    });
};

export const allDayAppointmentsRects = (
  appointments,
  leftBound, rightBound,
  excludedDays,
  dayScale,
  cellElements,
) => {
  const dateIntervals = calculateDateIntervals(
    appointments,
    leftBound, rightBound,
    excludedDays,
  );
  return calculateRectsByDateIntervals(
    dateIntervals,
    dayScale,
    cellElements,
  );
};
