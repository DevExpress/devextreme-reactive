import moment from 'moment';
import { calculateFirstDateOfWeek } from './helpers';

const calculateViewBound = (dateBound, timeBound) => {
  const time = moment(timeBound);
  return moment(dateBound)
    .hour(time.hours())
    .minute(time.minutes())
    .toDate();
};

const substractSecond = date =>
  moment(date).subtract(1, 'second').toDate();

export const timeScale = (
  currentDate,
  firstDayOfWeek,
  startDayHour,
  endDayHour,
  cellDuration,
  excludedDays,
) => {
  const result = [];
  const startViewDate = calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excludedDays);
  const left = moment(startViewDate).startOf('hour').hour(startDayHour);
  const right = moment(startViewDate).startOf('hour').hour(endDayHour);
  while (left.isBefore(right)) {
    const startDate = left.toDate();
    left.add(cellDuration, 'minutes');
    result.push({ start: startDate, end: left.toDate() });
  }
  result[result.length - 1].end = substractSecond(result[result.length - 1].end);
  return result;
};

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

export const startViewDate = (days, times) =>
  calculateViewBound(days[0], times[0].start);

export const endViewDate = (days, times) => {
  const bound = calculateViewBound(days[days.length - 1], times[times.length - 1].end);
  return substractSecond(bound);
};
