import moment from 'moment';
import {
  MonthCellsDataComputed, CurrentDate, Today,
  CalculateMonthDateIntervals, AppointmentMoment, LeftBound, RightBound,
} from '../../types';
import { viewPredicate } from '../../utils';
import { sliceAppointmentByWeek } from './helpers';

const DAY_COUNT = 7;
const MONTH_LENGTH = 31;

export const monthCellsData: MonthCellsDataComputed = (
  currentDate,
  firstDayOfWeek,
  intervalCount = 1,
  today,
) => {
  const targetDate = moment(currentDate as CurrentDate);
  const currentMonths = [targetDate.month()];
  while (currentMonths.length < intervalCount) {
    currentMonths.push(targetDate.add(1, 'months').month());
  }
  const firstMonthDate = moment(currentDate as CurrentDate).date(1);
  const firstMonthDay = firstMonthDate.day() - firstDayOfWeek;
  const prevMonthDayCount = firstMonthDate.day(firstMonthDay).day() || DAY_COUNT;
  const prevMonth = moment(currentDate as CurrentDate).subtract(1, 'months');
  const prevMonthStartDay = prevMonth.daysInMonth() - (prevMonthDayCount - 1);
  const from = moment()
    .year(prevMonth.year())
    .month(prevMonth.month())
    .date(prevMonthStartDay)
    .startOf('day');

  const result = [];
  while (result.length < (Math.trunc((MONTH_LENGTH * intervalCount) / DAY_COUNT) + 2)) {
    const week = [];
    while (week.length < DAY_COUNT) {
      week.push({
        startDate: from.toDate(),
        endDate: from.clone().add(1, 'day').toDate(),
        otherMonth: currentMonths.findIndex(month => month === from.month()) === -1,
        today: today ? moment(today as Today).isSame(from, 'date') : false,
      });
      from.add(1, 'day');
    }
    result.push(week);
  }
  return result;
};

export const calculateMonthDateIntervals: CalculateMonthDateIntervals = (
  appointments, leftBound, rightBound,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment => viewPredicate(appointment, leftBound, rightBound))
  .reduce((acc, appointment) => ([
    ...acc,
    ...sliceAppointmentByWeek(
      { left: moment(leftBound as LeftBound), right: moment(rightBound as RightBound) },
      appointment,
      DAY_COUNT,
    ),
  ]), [] as AppointmentMoment[]);
