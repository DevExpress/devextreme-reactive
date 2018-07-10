import moment from 'moment';
import {
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

export const getAppointments = (data, getAppointmentStartDate, getAppointmentEndDate) =>
  data.map(appointment => ({
    start: getAppointmentStartDate(appointment),
    end: getAppointmentEndDate(appointment),
    dataItem: appointment,
  }));

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
  startViewDate,
  endViewDate,
  excludedDays,
  filterAllDayAppointments = false,
) => (
  appointments.filter((appointment) => {
    const boundaries = { left: startViewDate, right: endViewDate };

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
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  timeScale,
  cellDuration,
  cellElements,
) => {
  const filteredByViewAppointments =
    filteredAppointments(
      appointments.map(({ start, end, ...restArgs }) =>
        ({ start: moment(start), end: moment(end), ...restArgs })),
      startViewDate,
      endViewDate,
      excludedDays,
      true,
    );
  const slicedAppointments =
    sliceAppointmentsByDay(filteredByViewAppointments);

  const filteredByBoundaryAppointments =
    filterAppointmentsByBoundary(
      slicedAppointments,
      startViewDate,
      endViewDate,
      excludedDays,
    );
  const appointmentParts =
    cutDayAppointments(filteredByBoundaryAppointments, startViewDate, endViewDate);
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
      dayScale,
      timeScale,
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
