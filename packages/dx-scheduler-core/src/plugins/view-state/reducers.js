import moment from 'moment';

export const changeCurrentDate = (currentDate, {
  nextDate,
  step,
  amount,
  direction = 'forward',
}) => (
  nextDate || moment(currentDate)[direction === 'back' ? 'subtract' : 'add'](amount, step).toDate()
);

export const setCurrentViewName = (currentViewName, { nextViewName }) => nextViewName;
