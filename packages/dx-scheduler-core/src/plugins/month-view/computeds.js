import moment from 'moment';
import {
  filteredAppointments,
  toPercentage,
} from './../appointments/computeds';
import {
  sortAppointments,
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
} from './../appointments/helpers';
import { sliceAppointmentsByWeek } from './helpers';

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

export const monthAppointmentRect = (
  appointments,
  startViewDate,
  endViewDate,
  cellElements, // [cell0, cell1, cell2, ...]
) => {
  const filteredByViewAppointments =
    filteredAppointments(
      appointments.map(({ start, end, ...restArgs }) =>
        ({ start: moment(start), end: moment(end), ...restArgs })),
      startViewDate,
      endViewDate,
      [],
      true,
    );
  const slicedAppointments = sliceAppointmentsByWeek(filteredByViewAppointments);
  const filteredByViewAppointments2 =
    filteredAppointments(
      slicedAppointments,
      startViewDate,
      endViewDate,
      [],
      true,
    );

  const sorted = sortAppointments(filteredByViewAppointments2);
  const groups = findOverlappedAppointments(sorted);
  const withOffset = adjustAppointments(groups);

  return unwrapGroups(withOffset).map((appt) => {
    const {
      top,
      left,
      width,
      height,
      parentWidth,
    } = getRectByDates(
      appt.start,
      appt.end,
      dayScale,
      timeScale,
      cellDuration,
      cellElements,
    );
    const widthInPx = width / appt.reduceValue;
    return {
      top,
      height,
      left: toPercentage(left + (widthInPx * appt.offset), parentWidth),
      width: toPercentage(widthInPx, parentWidth),
      dataItem: appt.dataItem,
    };
  });
};
