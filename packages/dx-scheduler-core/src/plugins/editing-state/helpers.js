import moment from 'moment';

export const prepareToAdding = (addAppointment, {
  date, start: startTime, end: endTime, title,
}) => {
  const start = moment(date).hours(startTime.getHours()).minutes(startTime.getMinutes());
  const end = moment(date).hours(endTime.getHours()).minutes(endTime.getMinutes());
  addAppointment({ startDate: start.toDate(), endDate: end.toDate(), title });
};
