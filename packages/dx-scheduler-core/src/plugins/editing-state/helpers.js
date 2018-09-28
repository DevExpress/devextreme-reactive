import moment from 'moment';

export const createWeekAppointment = (addAppointment, {
  date, start: startTime, end: endTime, title,
}) => {
  const start = moment(date).hours(startTime.getHours()).minutes(startTime.getMinutes()).toDate();
  const end = moment(date).hours(endTime.getHours()).minutes(endTime.getMinutes()).toDate();
  addAppointment({ appointment: { startDate: start, endDate: end, title } });
};

export const createMonthAppointment = (addAppointment, {
  date, title,
}) => {
  const start = moment(date).startOf('day').toDate();
  const end = moment(date).add(1, 'days').startOf('day').toDate();
  addAppointment({
    apppointment: {
      startDate: start, endDate: end, title, allDay: true,
    },
  });
};
