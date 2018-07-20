import moment from 'moment';
import {
  sortAppointments,
  viewPredicate,
} from './../../utils';
import {
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
} from './../week-view/helpers';
import {
  sliceAppointmentByWeek,
  getRectByDates,
} from './helpers';

const DAY_COUNT = 7;
const WEEK_COUNT = 6;

const toPercentage = (value, total) => (value * 100) / total;

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

const calculateDateIntervals = (
  appointments,
  leftBound, rightBound,
  monthCells1,
) => appointments
  .map(({ start, end, ...restArgs }) =>
    ({ start: moment(start), end: moment(end), ...restArgs }))
  .filter(appointment =>
    viewPredicate(appointment, leftBound, rightBound))
  .reduce((acc, appointment) =>
    ([...acc, ...sliceAppointmentByWeek(appointment, monthCells1)]), [])
  .filter(appointment =>
    viewPredicate(appointment, leftBound, rightBound));

const calculateRectsByDateIntervals = (
  intervals,
  monthCells1,
  cellElements,
) => {
  const sorted = sortAppointments(intervals, true);
  const grouped = findOverlappedAppointments(sorted, true);

  return unwrapGroups(adjustAppointments(grouped, true))
    .map((appts) => {
      const {
        top, left,
        width, height,
        parentWidth,
      } = getRectByDates(
        appts.start,
        appts.end,
        monthCells1,
        cellElements,
      );

      return {
        top: top + ((height / appts.reduceValue) * appts.offset),
        height: height / appts.reduceValue,
        left: toPercentage(left, parentWidth),
        width: toPercentage(width, parentWidth),
        dataItem: appts.dataItem,
      };
    });
};

export const monthAppointmentRect = (
  appointments,
  startViewDate,
  endViewDate,
  monthCells1,
  cellElements,
) => {
  const dateIntervals = calculateDateIntervals(
    appointments,
    startViewDate,
    endViewDate,
    monthCells1,
  );
  return calculateRectsByDateIntervals(
    dateIntervals,
    monthCells1,
    cellElements,
  );
};
