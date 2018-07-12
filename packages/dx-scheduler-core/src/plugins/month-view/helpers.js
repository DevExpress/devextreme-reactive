import moment from 'moment';

export const sliceAppointmentsByWeek = (
  appointments,
  startDayOfWeek = 0,
) => {
  const nextAppointments = [];

  appointments.forEach((appointment) => {
    const weekCount = appointment.end.diff(appointment.start, 'week');
    const startWeekDate = moment(appointment.start).day(startDayOfWeek);
    const endWeekDate = moment(appointment.end).day(startDayOfWeek);
    const dayCount = appointment.end.diff(appointment.start, 'day');
    if (dayCount > 7
      || startWeekDate.isBetween(appointment.start, appointment.end, null, '(]')
      || endWeekDate.isBetween(appointment.start, appointment.end, null, '(]')) {
      const loopCount = weekCount || 1;
      let nextAppointmentStart = moment(appointment.start);
      let nextAppointmentEnd = moment(nextAppointmentStart).day(startDayOfWeek + 6).endOf('day');
      for (let weekPart = 0; weekPart < loopCount; weekPart += 1) {
        nextAppointments.push({
          start: nextAppointmentStart,
          end: nextAppointmentEnd,
          dataItem: appointment.dataItem,
        });
        nextAppointmentStart = moment(nextAppointmentStart).day(startDayOfWeek + 7).startOf('day');
        nextAppointmentEnd = moment(nextAppointmentEnd).day(startDayOfWeek + 7);
      }
      nextAppointments.push({
        start: nextAppointmentStart,
        end: appointment.end,
        dataItem: appointment.dataItem,
      });
    } else {
      nextAppointments.push(appointment);
    }
  });

  return nextAppointments;
};
