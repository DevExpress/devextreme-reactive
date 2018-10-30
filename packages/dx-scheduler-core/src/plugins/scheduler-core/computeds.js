export const appointments = (
  data,
  // getAppointmentStartDate,
  // getAppointmentEndDate,
  // getAppointmentAllDay,
  appointmentMapping,
) => data.map(appointment => ({
  start: appointmentMapping(appointment).startDate,
  end: appointmentMapping(appointment).endDate,
  ...appointmentMapping(appointment).allDay !== undefined && {
    allDay: appointmentMapping(appointment).allDay,
    // ...appointmentMapping(appointment),
  },
  dataItem: appointment,
}));
