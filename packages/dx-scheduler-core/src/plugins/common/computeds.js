import moment from 'moment';

export const dayScale = (
  currentDate = new Date(),
  firsDayOfWeek = 0,
  dayCount = 7,
  excluded = [],
) => {
  const result = [];
  const date = moment(currentDate).startOf('hour');
  date.day(firsDayOfWeek);
  for (let index = 0; index < dayCount; index += 1) {
    if (excluded.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }
  return result;
};
