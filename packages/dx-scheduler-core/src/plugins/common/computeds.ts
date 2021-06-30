import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  TimeScale, SchedulerDateTime, ViewCell,
  DayScaleFn, TimeScaleFn, ViewCellsDataFn, AllDayCell,
  SchedulerView,
} from '../../types';
import { calculateFirstDateOfWeek } from '../../utils';
import {
  isMidnight,
  containsDSTChange,
} from './helpers';

const subtractSecond: PureComputed<
  [Date]
> = date => moment(date as Date).subtract(1, 'second').toDate();

export const dayScale: DayScaleFn = (
  currentDate,
  firstDayOfWeek,
  dayCount,
  excluded = [],
) => {
  const result: Date[] = [];
  const date = firstDayOfWeek !== undefined
    ? moment(calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excluded) as Date)
    : moment(currentDate as Date);
  for (let index = 0; index < dayCount; index += 1) {
    if (excluded.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }
  return result;
};

export const timeScale: TimeScaleFn = (
  currentDate,
  firstDayOfWeek,
  startDayHour,
  endDayHour,
  cellDuration,
  excludedDays,
) => {
  const result: TimeScale[] = [];
  const startDateOfView = firstDayOfWeek !== undefined
    ? calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excludedDays)
    : currentDate;

  const isDSTChange = containsDSTChange(startDateOfView as Date);
  const validDate = moment(startDateOfView as Date);
  if (isDSTChange) {
    validDate.subtract(1, 'day');
  }

  const left = moment(validDate)
    .startOf('day')
    .add(startDayHour, 'hour');
  const right = moment(validDate)
    .startOf('day')
    .add(endDayHour, 'hour');

  while (left.isBefore(right)) {
    const startDate = left.toDate();
    left.add(cellDuration, 'minutes');
    result.push({ start: startDate, end: left.toDate() });
  }

  const timeScaleLastIndex = result.length - 1;
  if (isMidnight(result[timeScaleLastIndex].end)) {
    result[timeScaleLastIndex].end = subtractSecond(result[timeScaleLastIndex].end) as Date;
  }
  return result;
};

export const availableViews: PureComputed<
  [SchedulerView[], string, string], SchedulerView[]
> = (views, viewName, viewDisplayName) => {
  if (!views) return [{ name: viewName, displayName: viewDisplayName }];
  if (views.findIndex(view => viewName === view.name) === -1) {
    const nextViews = views.slice();
    nextViews.push({ name: viewName, displayName: viewDisplayName });
    return nextViews;
  }
  return views;
};

export const viewCellsData: ViewCellsDataFn = (
  currentDate, firstDayOfWeek,
  dayCount, excludedDays,
  startDayHour, endDayHour,
  cellDuration, currTime,
) => {
  const days = dayScale(currentDate, firstDayOfWeek!, dayCount!, excludedDays);
  const times = timeScale(
    currentDate, firstDayOfWeek!, startDayHour, endDayHour, cellDuration, excludedDays,
  );
  const currentTime = moment(currTime as SchedulerDateTime);
  return times.reduce((cellsAcc, time) => {
    const start = moment(time.start);
    const end = moment(time.end);
    const rowCells = days.reduce((rowAcc, day) => {
      const startDate = moment(day).hours(start.hours()).minutes(start.minutes()).toDate();
      const endDate = moment(day).hours(end.hours()).minutes(end.minutes()).toDate();
      const today = currentTime.isSame(startDate, 'day');
      rowAcc.push({ startDate, endDate, today });
      return rowAcc;
    }, [] as ViewCell[]);
    cellsAcc.push(rowCells);
    return cellsAcc;
  }, [] as ViewCell[][]);
};

export const timeCellsData: PureComputed<
  [ViewCell[][], number, number, number, number], ViewCell[][]
> = (
  cellsData, startDayHour, endDayHour, cellDuration, currentTime,
) => {
  const { startDate: firstViewDate } = cellsData[0][0];
  if (!containsDSTChange(firstViewDate)) {
    return cellsData;
  }

  const nextDay = moment(firstViewDate)
    .add(1, 'day')
    .toDate();
  const validCellsData = viewCellsData(
    nextDay, undefined, 1, [], startDayHour, endDayHour, cellDuration, currentTime,
  );

  return validCellsData;
};

export const allDayCells: PureComputed<
  [ViewCell[][]], AllDayCell[][]
> = viewCells => [viewCells[0].map(cell => ({
  startDate: moment(cell.startDate).startOf('day').toDate(),
  endDate: moment(cell.startDate).add(1, 'day').startOf('day').toDate(),
  groupingInfo: cell.groupingInfo,
  endOfGroup: cell.endOfGroup,
}))];

export const startViewDate: PureComputed<
  [ViewCell[][]], Date
> = viewCells => moment(viewCells[0][0].startDate).toDate();

export const endViewDate: PureComputed<
  [ViewCell[][]], Date
> = (viewCells) => {
  const lastRowIndex = viewCells.length - 1;
  const lastCellIndex = viewCells[lastRowIndex].length - 1;
  return subtractSecond(viewCells[lastRowIndex][lastCellIndex].endDate!);
};
