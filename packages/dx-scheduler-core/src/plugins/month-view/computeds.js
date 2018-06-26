import moment from 'moment';

const DAY_COUNT = 7;
const WEEK_COUNT = 6;

export const cells = (currentDate, firstDayOfWeek) => {
  const prevMonthDayCount = moment(currentDate).date(1).day() - firstDayOfWeek;
  const prevMonth = moment(currentDate).subtract(1, 'months');
  const prevMonthStartDay = prevMonth.daysInMonth() - (prevMonthDayCount - 1);
  const from = moment()
    .year(prevMonth.year())
    .month(prevMonth.month())
    .date(prevMonthStartDay)
    .startOf('date');

  const result = [];
  while (result.length < WEEK_COUNT) {
    const week = [];
    while (week.length < DAY_COUNT) {
      week.push(from.toDate());
      from.add(1, 'day');
    }
    result.push(week);
  }

  return result;
};
