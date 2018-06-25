import moment from 'moment';

export const timeUnits = (startDayHour = 0, endDayHour = 24, cellDuration = 30) => {
  const result = [];
  const left = moment().startOf('hour').hour(startDayHour);
  const right = moment().startOf('hour').hour(endDayHour);
  while (left.isBefore(right)) {
    result.push([
      [left.hour(), left.minute()],
    ]);
    left.add(cellDuration, 'minutes');
    result[result.length - 1].push([
      left.hour(), left.minute(),
    ]);
  }

  return result;
};

export const dayUnits = (
  currentDate = new Date(),
  firsDayOfWeek = 0,
  dayCount = 7,
  except = [],
) => {
  const result = [];
  const date = moment(currentDate).startOf('hour');
  date.day(firsDayOfWeek);

  for (let index = 0; index < dayCount; index += 1) {
    if (except.findIndex(item => item === date.day()) === -1) {
      result.push(date.format());
    }
    date.add(1, 'days');
  }

  return result;
};
