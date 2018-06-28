import moment from 'moment';

export const filteredAppointments = (
  startViewDate,
  endViewDate,
  appointments,
  getAppointmentStartDate,
  getAppointmentEndDate,
) => (
  appointments.filter((appointment) => {
    const appointmentStartDate = getAppointmentStartDate(appointment);
    const appointmentEndDate = getAppointmentEndDate(appointment);

    return (
      moment(appointmentStartDate).isBetween(startViewDate, endViewDate)
      ||
      moment(appointmentEndDate).isBetween(startViewDate, endViewDate)
      ||
      (
        moment(appointmentStartDate).isSameOrBefore(startViewDate)
        &&
        moment(appointmentEndDate).isSameOrAfter(endViewDate)
      )
    );
  })
);
