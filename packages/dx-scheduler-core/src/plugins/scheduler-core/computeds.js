export const appointments = (
  data,
  mapAppointmentData,
) => data.map((appointment) => {
  const { startDate, endDate, allDay } = mapAppointmentData(appointment);
  return ({
    start: startDate,
    end: endDate,
    ...allDay !== undefined && {
      allDay,
    },
    dataItem: appointment,
  });
});
