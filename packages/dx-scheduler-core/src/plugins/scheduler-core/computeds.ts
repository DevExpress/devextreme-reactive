export const appointments = data => data.map(appointment => ({
  start: appointment.startDate,
  end: appointment.endDate,
  ...appointment.allDay !== undefined && {
    allDay: appointment.allDay,
  },
  dataItem: appointment,
}));
