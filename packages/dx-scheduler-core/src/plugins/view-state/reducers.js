import moment from 'moment';

export const setCurrentDate = (currentDate, { nextDate, step, back = false }) => (
  nextDate || moment(currentDate)[back ? 'subtract' : 'add'](step, 'days').toDate()
);

export const setCurrentView = (currentView, { nextView }) => nextView;
