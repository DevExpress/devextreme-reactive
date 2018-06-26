import moment from 'moment';

const DAY_COUNT = 7;
const WEEK_COUNT = 6;

export const monthCells = (currentDate, firstDayOfWeek) => {
  const currentMonth = moment(currentDate).month();
  const currentDay = moment(currentDate).date();
  const firstMonthDate = moment(currentDate).date(1);
  const firstMonthDay = firstMonthDate.day() - firstDayOfWeek;
  const prevMonthDayCount = firstMonthDate.day(firstMonthDay).day() || DAY_COUNT;
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
      week.push({
        value: from.toDate(),
        isOtherMonth: from.month() !== currentMonth,
        isCurrent: currentDay === from.date() && from.month() === currentMonth,
      });
      from.add(1, 'day');
    }
    result.push(week);
  }

  return result;
};
