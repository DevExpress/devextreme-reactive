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

const predicate = (start, end, boundary, excludedDays) => {
  const { left, right } = boundary;

  const isAppointmentInBoundary = (
    start.isBetween(left, right) || end.isBetween(left, right)
    ||
    (start.isSameOrBefore(left) && end.isSameOrAfter(right))
  );

  const isAppointmentInExcludedDays = !excludedIntervals(excludedDays, moment(left))
    .find(interval => (
      start.isBetween(...interval, null, '[]')
      &&
      end.isBetween(...interval, null, '[]')
    ));

  return isAppointmentInBoundary && isAppointmentInExcludedDays;
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
