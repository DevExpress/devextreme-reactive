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
