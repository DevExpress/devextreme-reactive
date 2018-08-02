import moment from 'moment';
import {
  getRectByDates,
  sliceAppointmentByDay,
  dayBoundaryPredicate,
  reduceAppointmentByDayBounds,
} from './helpers';
import {
  sortAppointments,
  viewPredicate,
  calculateFirstDateOfWeek,
  toPercentage,
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
} from '../../utils';
import { VERTICAL_APPOINTMENT_TYPE } from '../../constants';

const subtractSecond = date => moment(date).subtract(1, 'second').toDate();

const calculateViewBound = (dateBound, timeBound) => {
  const time = moment(timeBound);
  return moment(dateBound)
    .hour(time.hours())
    .minute(time.minutes())
    .toDate();
};

const calculateDateIntervals = (
  appointments,
  leftBound, rightBound,
  excludedDays,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound, excludedDays, true))
  .reduce((acc, appointment) => ([...acc, ...sliceAppointmentByDay(appointment)]), [])
  .filter(appointment => dayBoundaryPredicate(appointment, leftBound, rightBound, excludedDays))
  .map(appointment => reduceAppointmentByDayBounds(appointment, leftBound, rightBound));

const calculateRectsByDateIntervals = (
  intervals,
  dayScale, timeScale,
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
        dayScale, timeScale,
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

export const appointmentRects = (
  appointments,
  leftBound, rightBound,
  excludedDays,
  dayScale, timeScale,
  cellDuration, cellElements,
) => {
  const dateIntervals = calculateDateIntervals(
    appointments,
    leftBound, rightBound,
    excludedDays,
  );
  return calculateRectsByDateIntervals(
    dateIntervals,
    dayScale, timeScale,
    cellDuration, cellElements,
  );
};

export const timeScale = (
  currentDate,
  firstDayOfWeek,
  startDayHour,
  endDayHour,
  cellDuration,
  excludedDays,
) => {
  const result = [];
  const startViewDate = calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excludedDays);
  const left = moment(startViewDate).startOf('hour').hour(startDayHour);
  const right = moment(startViewDate).startOf('hour').hour(endDayHour);
  while (left.isBefore(right)) {
    const startDate = left.toDate();
    left.add(cellDuration, 'minutes');
    result.push({ start: startDate, end: left.toDate() });
  }
  result[result.length - 1].end = subtractSecond(result[result.length - 1].end);
  return result;
};

export const startViewDate = (days, times) => calculateViewBound(days[0], times[0].start);

export const endViewDate = (days, times) => {
  const bound = calculateViewBound(days[days.length - 1], times[times.length - 1].end);
  return subtractSecond(bound);
};
