import moment from 'moment';
import {
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  momentAppointments,
  getCellByDate,
  predicate,
  filterAppointmentsByBoundary,
  cutDayAppointments,
  removeAllDayAppointments,
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
) => (
  appointments.filter((appointment) => {
    const boundaries = { left: startViewDate, right: endViewDate };

    return predicate(
      moment(appointment.start),
      moment(appointment.end),
      boundaries,
      excludedDays,
    );
  })
);

export const sliceAppointmentsByDay = appointments =>
  appointments.reduce((acc, appointment) => {
    const startDate = moment(appointment.start);
    const endDate = moment(appointment.end);
    if (startDate.isSame(endDate, 'day')) {
      acc.push(appointment);
    } else {
      acc.push(
        { start: startDate.toDate(), end: moment(startDate).endOf('day').toDate(), dataItem: appointment.dataItem },
        { start: moment(endDate).startOf('day').toDate(), end: endDate.toDate(), dataItem: appointment.dataItem },
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
      appointments,
      startViewDate,
      endViewDate,
      excludedDays,
    );
  const removedAllDayAppointments =
    removeAllDayAppointments(filteredByViewAppointments);

  const slicedByDayAppointments =
    sliceAppointmentsByDay(removedAllDayAppointments);

  const filteredByBoundaryAppointments =
    filterAppointmentsByBoundary(
      slicedByDayAppointments,
      startViewDate,
      endViewDate,
      excludedDays,
    );
  const appointmentParts =
    cutDayAppointments(filteredByBoundaryAppointments, startViewDate, endViewDate);
  const mAppointments = momentAppointments(appointmentParts);
  const sorted = sortAppointments(mAppointments);
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
