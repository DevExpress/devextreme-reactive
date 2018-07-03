import moment from 'moment';
import {
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  momentAppointments,
} from './helpers';

const createExcludedInterval = (day, start) => {
  const leftBound = moment(start.day(day));
  return [
    leftBound,
    moment(leftBound).hour(start.hour()).endOf('day'),
  ];
};

const excludedIntervals = (excludedDays, start) => excludedDays
  .map(day => (day === 0 ? 7 : day))
  .sort()
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[i - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, []);

const predicate = (start, end, boundary, excludedDays) => {
  const { left, right } = boundary;

  const isAppointmentInBoundary = (
    start.isBetween(left, right) || end.isBetween(left, right)
    ||
    (start.isSameOrBefore(left) && end.isSameOrAfter(right))
  );

  const isAppointmentInExcludedDays = !!excludedIntervals(excludedDays, moment(left))
    .find(interval => (
      start.isBetween(...interval, null, '[]')
      &&
      end.isBetween(...interval, null, '[]')
    ));

  return isAppointmentInBoundary && !isAppointmentInExcludedDays;
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

    return predicate(
      moment(appointmentStartDate),
      moment(appointmentEndDate),
      { left: startViewDate, right: endViewDate },
      excludedDays,
    );
  })
);

export const appointmentsWithOffset = (appointments) => {
  const mAppointments = momentAppointments(appointments);
  const sorted = sortAppointments(mAppointments);
  const groups = findOverlappedAppointments(sorted);
  const withOffset = adjustAppointments(groups);
  return withOffset;
};

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

export const sliceAppointmentsByDay = (appointments) => {
  const result = appointments.reduce((acc, appointment) => {
    const startDate = moment(appointment.start);
    const endDate = moment(appointment.end);
    if (startDate.isSame(endDate, 'day')) {
      acc.push(appointment);
    } else {
      acc.push({ end: moment(startDate).endOf('day').toDate(), start: startDate.toDate(), dataItem: appointment.dataItem });
      acc.push({ start: moment(endDate).startOf('day').toDate(), end: endDate.toDate(), dataItem: appointment.dataItem });
    }
    return acc;
  }, []);
  return result;
};

export const sliceAppointments = (appointments, startViewDate, endViewDate) => {
  const nextAppointments = [];
  appointments.forEach((appointment) => {
    const appointmentStartViewStart = moment(appointment.start)
      .hour(moment(startViewDate).hour())
      .minutes(moment(startViewDate).minutes());
    const appointmentStartViewEnd = moment(appointment.start)
      .hour(moment(endViewDate).hour())
      .minutes(moment(endViewDate).minutes());
    const appointmentEndViewStart = moment(appointment.end)
      .hour(moment(startViewDate).hour())
      .minutes(moment(startViewDate).minutes());
    const appointmentEndViewEnd = moment(appointment.end)
      .hour(moment(endViewDate).hour())
      .minutes(moment(endViewDate).minutes());

    if (moment(appointment.start).isBefore(startViewDate)) { // start before startViewDate
      if (moment(appointment.end).isBefore(appointmentEndViewEnd)) {
        nextAppointments.push({
          dataItem: appointment.dataItem, start: startViewDate, end: appointment.end,
        });
      } else {
        nextAppointments.push({
          dataItem: appointment.dataItem, start: startViewDate, end: appointmentEndViewEnd.toDate(),
        });
      }
    } else if (moment(appointment.end).isAfter(endViewDate)) { // end after endViewDate
      if (moment(appointment.start).isBefore(appointmentStartViewStart)) {
        nextAppointments.push({
          dataItem: appointment.dataItem,
          start: appointmentStartViewStart.toDate(),
          end: endViewDate,
        });
      } else {
        nextAppointments.push({
          dataItem: appointment.dataItem,
          start: appointment.start,
          end: endViewDate,
        });
      }
    } else if (moment(appointment.start).isBefore(appointmentStartViewEnd)) {
      if (moment(appointment.end).isBefore(appointmentStartViewEnd)) {
        nextAppointments.push(appointment);
      } else if (moment(appointment.end).isAfter(appointmentStartViewEnd) && moment(appointment.end).isBefore(appointmentEndViewStart)) {
        nextAppointments.push({ dataItem: appointment.dataItem, start: appointment.start, end: appointmentStartViewEnd.toDate() });
      } else {
        nextAppointments.push({ dataItem: appointment.dataItem, start: appointment.start, end: appointmentStartViewEnd.toDate() });
        nextAppointments.push({ dataItem: appointment.dataItem, start: appointmentEndViewStart.toDate(), end: appointment.end });
      }
    }
  });
  return nextAppointments;
};
