import moment from 'moment';
import { appointments } from './appointments';

let date = 1;
const makeTodayAppointment = (startDate, endDate) => {
  const currentDate = moment();
  const days = moment(startDate).diff(endDate, 'days');
  const nextStartDate = moment(startDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .day(date);
  const nextEndDate = moment(endDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .day(date + days);

  return {
    startDate: nextStartDate.toDate(),
    endDate: nextEndDate.toDate(),
  };
};

export default appointments.map(({ startDate, endDate, ...restArgs }) => {
  const result = {
    ...makeTodayAppointment(startDate, endDate),
    ...restArgs,
  };
  date += 1;
  if (date > 31) date = 1;
  return result;
});
