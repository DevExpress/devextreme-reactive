import moment from 'moment';

export const callActionIfExists = (action, payload) => {
  if (action) {
    action(payload);
  }
};

export const isAllDayCell = (startDate, endDate) => moment(endDate).diff(moment(startDate), 'days') >= 1;
