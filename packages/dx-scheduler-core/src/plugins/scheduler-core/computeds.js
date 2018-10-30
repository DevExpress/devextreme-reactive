export const appointments = (
  data,
  appointmentMapping,
) => data.map(appointment => ({
  start: appointmentMapping(appointment).startDate,
  end: appointmentMapping(appointment).endDate,
  ...appointmentMapping(appointment).allDay !== undefined && {
    allDay: appointmentMapping(appointment).allDay,
  },
  dataItem: appointment,
}));
