import moment from 'moment';

const createExcludedInterval = (day, start) => {
  const leftBound = moment(start.day(day));
  return [
    leftBound,
    moment(leftBound).hour(start.hour()).endOf('day'),
  ];
};

const excludedIntervals = (excludedDays, start) => excludedDays
  .map(day => (day === 0 ? 7 : day))
  .sort((a, b) => a - b)
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[i - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, []);

export const viewPredicate = (
  appointment, left, right,
  excludedDays = [],
  filterAllDayAppointments = false,
) => {
  const { start, end } = appointment;
  const isAppointmentInBoundary = end.isAfter(left) && start.isBefore(right);
  const inInterval = (date, interval) => date.isBetween(...interval, null, '[]');
  const isAppointmentInExcludedDays = !!excludedIntervals(excludedDays, moment(left))
    .find(interval => (inInterval(start, interval) && inInterval(end, interval)));

  const considerAllDayAppointment = filterAllDayAppointments
    ? moment(end).diff(start, 'hours') < 24
    : true;

  return isAppointmentInBoundary && !isAppointmentInExcludedDays && considerAllDayAppointment;
};

export const sortAppointments = appointments =>
  appointments.slice().sort((a, b) => {
    if (a.start.isBefore(b.start)) return -1;
    if (a.start.isAfter(b.start)) return 1;
    if (a.start.isSame(b.start)) {
      if (a.end.isBefore(b.end)) return 1;
      if (a.end.isAfter(b.end)) return -1;
    }
    return 0;
  });
