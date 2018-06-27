import moment from 'moment';

export const filteredAppointments = (startViewDate, endViewDate, appointments) => (
  appointments.filter(appointment => (
    moment(appointment[0]).isBetween(startViewDate, endViewDate)
    ||
    moment(appointment[1]).isBetween(startViewDate, endViewDate)
    ||
    (
      moment(appointment[0]).isSameOrBefore(startViewDate)
      &&
      moment(appointment[1]).isSameOrAfter(endViewDate)
    )
  ))
);
