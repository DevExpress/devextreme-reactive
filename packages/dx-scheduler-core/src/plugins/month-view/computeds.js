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
  sliceAppointmentsByWeek,
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

export const monthAppointmentRect = (
  appointments,
  startViewDate,
  endViewDate,
  monthCells1,
  cellElements,
) => {
  const mAppointments = appointments.map(({ start, end, ...appointment }) =>
    ({ start: moment(start), end: moment(end), ...appointment }));
  const filteredByViewAppointments = mAppointments
    .filter(appointment =>
      viewPredicate(appointment, startViewDate, endViewDate));
  const slicedAppointments = sliceAppointmentsByWeek(filteredByViewAppointments, monthCells1);
  const filteredByViewAppointments2 = slicedAppointments.filter(appointment =>
    viewPredicate(appointment, startViewDate, endViewDate));

  const sorted = sortAppointments(filteredByViewAppointments2, true);
  const groups = findOverlappedAppointments(sorted, true);
  const groupsWithReduceValue = adjustAppointments(groups, true);
  const planeAppointments = unwrapGroups(groupsWithReduceValue);
  const reacts = planeAppointments.map((appointmentt) => {
    const {
      top, left,
      width, height,
      parentWidth,
    } = getRectByDates(
      appointmentt.start,
      appointmentt.end,
      monthCells1,
      cellElements,
    );

    return {
      top: top + ((height / appointmentt.reduceValue) * appointmentt.offset),
      height: height / appointmentt.reduceValue,
      left: toPercentage(left, parentWidth),
      width: toPercentage(width, parentWidth),
      dataItem: appointmentt.dataItem,
    };
  });

  return reacts;
};
