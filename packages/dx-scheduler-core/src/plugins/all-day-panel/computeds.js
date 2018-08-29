import moment from 'moment';
import { allDayPredicate, getAllDayRects, sliceAppointmentsByBoundaries } from './helpers';
import {
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
  viewPredicate,
  sortAppointments,
  toPercentage,
} from '../../utils';
import {
  HORIZONTAL_APPOINTMENT_TYPE,
} from '../../constants';

const calculateDateIntervals = (
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

      return {
        top: top + ((height / appointment.reduceValue) * appointment.offset),
        height: height / appointment.reduceValue,
        left: toPercentage(left, parentWidth),
        width: toPercentage(width, parentWidth),
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
