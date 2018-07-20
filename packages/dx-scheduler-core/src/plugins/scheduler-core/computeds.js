export const appointments = (data, getAppointmentStartDate, getAppointmentEndDate) =>
  data.map(appointment => ({
    start: getAppointmentStartDate(appointment),
    end: getAppointmentEndDate(appointment),
    dataItem: appointment,
  }));
