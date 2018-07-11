import moment from 'moment';
import {
  calculateFirstDateOfWeek,
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  getRectByDates,
  filterAppointmentsByBoundary,
  cutDayAppointments,
  unwrapGroups,
} from './helpers';

import { filterAppointments } from '../../utils';

const toPercentage = (value, total) => (value * 100) / total;
const substractSecond = date => moment(date).subtract(1, 'second').toDate();

const calculateViewBound = (dateBound, timeBound) => {
  const time = moment(timeBound);
  return moment(dateBound)
    .hour(time.hours())
    .minute(time.minutes())
    .toDate();
};

const sliceAppointmentsByDay = appointments =>
  appointments.reduce((acc, appointment) => {
    const { start, end, dataItem } = appointment;
    if (start.isSame(end, 'day')) {
      acc.push(appointment);
    } else {
      acc.push(
        { start, end: moment(start).endOf('day'), dataItem },
        { start: moment(end).startOf('day'), end, dataItem },
      );
    }
    return acc;
  }, []);

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
  result[result.length - 1].end = substractSecond(result[result.length - 1].end);
  return result;
};

export const dayScale = (
  currentDate = new Date(),
  firsDayOfWeek = 0,
  dayCount = 7,
  excluded = [],
) => {
  const result = [];
  const date = moment(currentDate).startOf('hour');
  date.day(firsDayOfWeek);
  for (let index = 0; index < dayCount; index += 1) {
    if (excluded.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }
  return result;
};

export const startViewDate = (days, times) =>
  calculateViewBound(days[0], times[0].start);

export const endViewDate = (days, times) => {
  const bound = calculateViewBound(days[days.length - 1], times[times.length - 1].end);
  return substractSecond(bound);
};

export const appointmentRects = (
  appointments,
  leftBound,
  rightBound,
  excludedDays,
  dayScaleCore,
  timeScaleCore,
  cellDuration,
  cellElements,
) => {
  const filteredAppointments =
    filterAppointments(
      appointments.map(({ start, end, ...restArgs }) =>
        ({ start: moment(start), end: moment(end), ...restArgs })),
      leftBound,
      rightBound,
      excludedDays,
      true,
    );
  const slicedAppointments = sliceAppointmentsByDay(filteredAppointments);

  const filteredByBoundaryAppointments =
    filterAppointmentsByBoundary(
      slicedAppointments,
      leftBound,
      rightBound,
      excludedDays,
    );

  const appointmentParts =
    cutDayAppointments(filteredByBoundaryAppointments, leftBound, rightBound);

  const sorted = sortAppointments(appointmentParts);
  const groups = findOverlappedAppointments(sorted);
  const withOffset = adjustAppointments(groups);

  return unwrapGroups(withOffset).map((appt) => {
    const {
      top,
      left,
      width,
      height,
      parentWidth,
    } = getRectByDates(
      appt.start,
      appt.end,
      dayScaleCore,
      timeScaleCore,
      cellDuration,
      cellElements,
    );
    const widthInPx = width / appt.reduceValue;
    return {
      top,
      height,
      left: toPercentage(left + (widthInPx * appt.offset), parentWidth),
      width: toPercentage(widthInPx, parentWidth),
      dataItem: appt.dataItem,
    };
  });
};
