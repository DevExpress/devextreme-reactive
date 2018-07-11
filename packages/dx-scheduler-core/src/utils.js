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
  .sort()
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[i - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, []);

const appointmentPredicate = (
  appointment, boundary,
  excludedDays,
  filterAllDayAppointments,
) => {
  const { left, right } = boundary;
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

export const filterAppointments = (
  appointments,
  left,
  right,
  excludedDays = [],
  filterAllDayAppointments = false,
) => appointments.filter(({ start, end }) => appointmentPredicate(
  { start, end },
  { left, right },
  excludedDays,
  filterAllDayAppointments,
));
