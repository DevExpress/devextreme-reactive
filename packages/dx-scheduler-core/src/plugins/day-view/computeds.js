import moment from 'moment';
import { sliceAppointmentByBoundaries, getRectByDates } from './helpers';
import {
  sortAppointments,
  viewPredicate,
  toPercentage,
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
} from '../../utils';
import { VERTICAL_APPOINTMENT_TYPE } from '../../constants';

export const calculateDayViewDateIntervals = (
  appointments,
  leftBound, rightBound,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, [], true))
  .reduce((acc, appointment) => ([
    ...acc, ...sliceAppointmentByBoundaries(appointment, leftBound, rightBound),
  ]), []);

const calculateRectsByDateIntervals = (
  intervals,
  timeScale, currentDate,
  cellDuration, cellElements,
) => {
  const sorted = sortAppointments(intervals);
  const grouped = findOverlappedAppointments(sorted);

  return unwrapGroups(adjustAppointments(grouped))
    .map((appointment) => {
      const {
        top, left,
        width, height,
        parentWidth,
      } = getRectByDates(
        appointment.start, appointment.end,
        currentDate, timeScale,
        cellDuration, cellElements,
      );
      const widthInPx = width / appointment.reduceValue;
      return {
        top,
        height,
        left: toPercentage(left + (widthInPx * appointment.offset), parentWidth),
        width: toPercentage(widthInPx, parentWidth),
        dataItem: appointment.dataItem,
        type: VERTICAL_APPOINTMENT_TYPE,
      };
    });
};

export const dayAppointmentRects = (
  appointments,
  leftBound, rightBound,
  timeScale, currentDate,
  cellDuration, cellElements,
) => {
  const dateIntervals = calculateDayViewDateIntervals(
    appointments,
    leftBound, rightBound,
  );
  return calculateRectsByDateIntervals(
    dateIntervals,
    timeScale, currentDate,
    cellDuration, cellElements,
  );
};
