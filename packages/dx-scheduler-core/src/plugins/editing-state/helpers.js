import moment from 'moment';

export const createWeekAppointment = (addAppointment, {
  date, start: startTime, end: endTime, title,
}) => {
  const start = moment(date).hours(startTime.getHours()).minutes(startTime.getMinutes()).toDate();
  const end = moment(date).hours(endTime.getHours()).minutes(endTime.getMinutes()).toDate();
  addAppointment({ startDate: start, endDate: end, title });
};

export const createMonthAppointment = (addAppointment, {
  date, title,
}) => {
  const start = moment(date).startOf('day').hours(9).toDate();
  const end = moment(date).endOf('day').toDate();
  addAppointment({ startDate: start, endDate: end, title });
};
