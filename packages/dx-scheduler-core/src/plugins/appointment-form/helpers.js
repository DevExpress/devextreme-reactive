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

export const createAppointment = (params) => {
  let appointment = {};
  if (params.time) { // day, week
    const date = moment(params.date);
    const timeStart = moment(params.time.start);
    const timeEnd = moment(params.time.end);

    const sHours = timeStart.hours();
    const sMinutes = timeStart.minutes();
    const eHours = timeEnd.hours();
    const eMinutes = timeEnd.minutes();

    appointment = {
      title: undefined,
      startDate: date.hours(sHours).minutes(sMinutes).toDate(),
      endDate: date.hours(eHours).minutes(eMinutes).toDate(),
    };
  } else if (params.date.value) { // month
    const date = moment(params.date.value);
    appointment = {
      title: undefined,
      startDate: date.toDate(),
      endDate: date.add(1, 'days').toDate(),
    };
  } else {
    const date = moment(params.date);
    appointment = { // all day
      title: undefined,
      allDay: true,
      startDate: date.toDate(),
      endDate: date.add(1, 'days').toDate(),
    };
  }
  return appointment;
};
