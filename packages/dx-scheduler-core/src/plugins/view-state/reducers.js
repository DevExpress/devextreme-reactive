import moment from 'moment';

export const changeCurrentDate = (currentDate, {
  nextDate,
  step,
  amount,
  back = false,
}) => (
  nextDate || moment(currentDate)[back ? 'subtract' : 'add'](amount, step).toDate()
);
