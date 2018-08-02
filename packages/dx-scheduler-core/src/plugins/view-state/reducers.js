import moment from 'moment';

export const changeCurrentDate = (currentDate, { nextDate, step, back = false }) => (
  nextDate || moment(currentDate)[back ? 'subtract' : 'add'](step, 'days').toDate()
);
