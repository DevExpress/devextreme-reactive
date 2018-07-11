import moment from 'moment';
import {
  calculateFirstDateOfWeek,
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  getCellByDate,
  predicate,
  filterAppointmentsByBoundary,
  cutDayAppointments,
  unwrapGroups,
} from './helpers';

const CELL_GAP = 0.15;
const toPercentage = (value, total) => (value * 100) / total;
const substractSecond = date => moment(date).subtract(1, 'second').toDate();

const calculateViewBound = (dateBound, timeBound) => {
  const time = moment(timeBound);
  return moment(dateBound)
    .hour(time.hours())
    .minute(time.minutes())
    .toDate();
};

const getCellRect = (date, days, times, cellDuration, cellElements, takePrev) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getCellByDate(days, times, date, takePrev);

  const cellElement = cellElements[cellIndex];
  const {
    top,
    left,
    width,
    height: cellHeight,
  } = cellElement.getBoundingClientRect();
  const timeOffset = moment(date).diff(cellStartDate, 'minutes');
  const topOffset = cellHeight * (timeOffset / cellDuration);
  let parentRect = { left: 0, top: 0, width: 0 };
  if (cellElement.offsetParent) {
    parentRect = cellElement.offsetParent.getBoundingClientRect();
  }
  return {
    top,
    left,
    width,
    topOffset,
    parentRect,
  };
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

export const getRectByDates = (
  startDate,
  endDate,
  days,
  times,
  cellDuration,
  cellElements,
) => {
  const firstCellRect = getCellRect(startDate, days, times, cellDuration, cellElements, false);
  const lastCellRect = getCellRect(endDate, days, times, cellDuration, cellElements, true);

  const top = firstCellRect.top + firstCellRect.topOffset;
  const height = (lastCellRect.top + lastCellRect.topOffset) - top;

  return {
    width: firstCellRect.width - (firstCellRect.width * CELL_GAP),
    top: top - firstCellRect.parentRect.top,
    left: firstCellRect.left - firstCellRect.parentRect.left,
    parentWidth: firstCellRect.parentRect.width,
    height,
  };
};

export const filteredAppointments = (
  appointments,
  left,
  right,
  excludedDays,
  filterAllDayAppointments = false,
) => (
  appointments.filter((appointment) => {
    const boundaries = { left, right };

    return predicate(
      appointment.start,
      appointment.end,
      boundaries,
      excludedDays,
      filterAllDayAppointments,
    );
  })
);

export const sliceAppointmentsByDay = appointments =>
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
  const filteredByViewAppointments =
    filteredAppointments(
      appointments.map(({ start, end, ...restArgs }) =>
        ({ start: moment(start), end: moment(end), ...restArgs })),
      leftBound,
      rightBound,
      excludedDays,
      true,
    );
  const slicedAppointments = sliceAppointmentsByDay(filteredByViewAppointments);

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
