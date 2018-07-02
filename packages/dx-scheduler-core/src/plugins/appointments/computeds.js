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

export const sliceAppointments = (appointments, startViewDate, endViewDate) => {
  const nextAppointments = [];
  appointments.forEach((appointment) => {
    const appointmentStartViewStart = moment(startViewDate).date(moment(appointment.start).date());
    const appointmentStartViewEnd = moment(endViewDate).date(moment(appointment.start).date());
    const appointmentEndViewStart = moment(startViewDate).date(moment(appointment.end).date());
    const appointmentEndViewEnd = moment(endViewDate).date(moment(appointment.end).date());

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
