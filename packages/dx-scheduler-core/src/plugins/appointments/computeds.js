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
  groupsToPlain,
} from './helpers';

const CELL_GAP = 0.15;

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

  return {
    top,
    left,
    width,
    topOffset,
    parentRect: cellElement.offsetParent.getBoundingClientRect(),
  };
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
    height,
  };
};

export const filteredAppointments = (
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  getAppointmentStartDate,
  getAppointmentEndDate,
) => (
  appointments.filter((appointment) => {
    const appointmentStartDate = getAppointmentStartDate(appointment);
    const appointmentEndDate = getAppointmentEndDate(appointment);
    const boundaries = { left: startViewDate, right: endViewDate };

    return predicate(
      moment(appointmentStartDate),
      moment(appointmentEndDate),
      boundaries,
      excludedDays,
    );
  })
);

export const formattedAppointments = (
  appointments,
  getAppointmentStartDate,
  getAppointmentEndDate,
) =>
  appointments.map(appointment => ({
    start: getAppointmentStartDate(appointment),
    end: getAppointmentEndDate(appointment),
    dataItem: appointment,
  }));

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

export const appointmentsWithCoordinates = (
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  getAppointmentStartDate,
  getAppointmentEndDate,
) => {
  const filteredByViewAppointments =
    filteredAppointments(
      appointments,
      startViewDate,
      endViewDate,
      excludedDays,
      getAppointmentStartDate,
      getAppointmentEndDate,
    );
  const formattedAppointments2 =
    formattedAppointments(
      filteredByViewAppointments,
      getAppointmentStartDate,
      getAppointmentEndDate,
    );
  const removedAllDayAppointments =
    removeAllDayAppointments(formattedAppointments2);
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
  const plainAppointments = groupsToPlain(withOffset);

  return plainAppointments;
};
