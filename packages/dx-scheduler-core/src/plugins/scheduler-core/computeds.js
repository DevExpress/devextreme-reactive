export const appointments = (
  data,
  getAppointmentStartDate,
  getAppointmentEndDate,
  getAppointmentAllDay,
) => data.map(appointment => ({
  start: getAppointmentStartDate(appointment),
  end: getAppointmentEndDate(appointment),
  ...getAppointmentAllDay(appointment) !== undefined && {
    allDay: getAppointmentAllDay(appointment),
  },
  dataItem: appointment,
}));
