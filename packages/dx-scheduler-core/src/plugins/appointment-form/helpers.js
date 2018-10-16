import moment from 'moment';

export const changeAppointmentField = (
  isNew, create, update, setAppointmentField,
) => (nextValue) => {
  const action = isNew ? create : update;
  action({ change: setAppointmentField({}, nextValue) });
};

export const callActionIfExists = (action, payload) => {
  if (action) {
    action(payload);
  }
};

export const isAllDayCell = (startDate, endDate) => moment(endDate).diff(moment(startDate), 'days') >= 1;
