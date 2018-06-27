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

export const getAppointmentMeta = (item, gridScale) => {


  return ({
    title: item.title,
    width: 80,
    height: 120,
    top: 10,
    left: 110,
  });
};
