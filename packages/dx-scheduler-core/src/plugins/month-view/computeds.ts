import moment from 'moment';
import {
  MonthCellsDataComputedFn, MonthCellData,
  CalculateMonthDateIntervalsFn, AppointmentMoment,
} from '../../types';
import { filterByViewBoundaries } from '../../utils';
import { sliceAppointmentByWeek } from './helpers';

const DAY_COUNT = 7;
const MONTH_LENGTH = 31;

export const monthCellsData: MonthCellsDataComputedFn = (
  currentDate,
  firstDayOfWeek,
  intervalCount = 1,
  today,
) => {
  const targetDate = moment(currentDate as Date);
  const currentMonths = [targetDate.month()];
  while (currentMonths.length < intervalCount) {
    currentMonths.push(targetDate.add(1, 'months').month());
  }
  const firstMonthDate = moment(currentDate as Date).date(1);
  const firstMonthDay = firstMonthDate.day() - firstDayOfWeek;
  const prevMonthDayCount = firstMonthDate.day(firstMonthDay).day() || DAY_COUNT;
  const prevMonth = moment(currentDate as Date).subtract(1, 'months');
  const prevMonthStartDay = prevMonth.daysInMonth() - (prevMonthDayCount - 1);
  const from = moment()
    .year(prevMonth.year())
    .month(prevMonth.month())
    .date(prevMonthStartDay)
    .startOf('day');

  const result: MonthCellData[][] = [];
  while (result.length < (Math.trunc((MONTH_LENGTH * intervalCount) / DAY_COUNT) + 2)) {
    const week: MonthCellData[] = [];
    while (week.length < DAY_COUNT) {
      week.push({
        startDate: from.toDate(),
        endDate: from.clone().add(1, 'day').toDate(),
        otherMonth: currentMonths.findIndex(month => month === from.month()) === -1,
        today: today ? moment(today as Date).isSame(from, 'date') : false,
      });
      from.add(1, 'day');
    }
    result.push(week);
  }
  return result;
};

export const calculateMonthDateIntervals: CalculateMonthDateIntervalsFn = (
  appointments, leftBound, rightBound,
) => appointments
  .map(({ start, end, ...restArgs }) => ({ start: moment(start), end: moment(end), ...restArgs }))
  .reduce((acc, appointment) =>
    [...acc, ...filterByViewBoundaries(appointment, leftBound, rightBound, [], false)],
    [] as AppointmentMoment[],
  )
  .reduce((acc, appointment) => ([
    ...acc,
    ...sliceAppointmentByWeek(
      { left: moment(leftBound as Date), right: moment(rightBound as Date) },
      appointment,
      DAY_COUNT,
    ),
  ]), [] as AppointmentMoment[]);
