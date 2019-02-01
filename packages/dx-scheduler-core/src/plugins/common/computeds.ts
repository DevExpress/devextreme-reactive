import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  TimeScale, CurrentTime, ViewCell,
  DayScaleFn, TimeScaleFn, ViewCellsDataFn, AllDayCell,
} from '../../types';
import { calculateFirstDateOfWeek } from '../../utils';

const subtractSecond: PureComputed<
  [Date]
> = date => moment(date as Date).subtract(1, 'second').toDate();

export const dayScale: DayScaleFn = (
  currentDate,
  firstDayOfWeek,
  dayCount,
  excluded = [],
) => {
  const result = [];
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
  const left = moment(startDateOfView as Date).startOf('hour').hour(startDayHour);
  const right = moment(startDateOfView as Date).startOf('hour').hour(endDayHour);

  while (left.isBefore(right)) {
    const startDate = left.toDate();
    left.add(cellDuration, 'minutes');
    result.push({ start: startDate, end: left.toDate() });
  }
  result[result.length - 1].end = subtractSecond(result[result.length - 1].end) as Date;
  return result;
};

export const availableViewNames: PureComputed<
  [string[], string], string[]
> = (viewNames, viewName) => {
  if (!viewNames) return [viewName];
  if (viewNames.findIndex(view => viewName === view) === -1) {
    const nextViewNames = viewNames.slice();
    nextViewNames.push(viewName);
    return nextViewNames;
  }
  return viewNames;
};

export const viewCellsData: ViewCellsDataFn = (
  currentDate, firstDayOfWeek,
  dayCount, excludedDays,
  startDayHour, endDayHour,
  cellDuration, currTime,
) => {
  const days = dayScale(currentDate, firstDayOfWeek, dayCount, excludedDays);
  const times = timeScale(
    currentDate, firstDayOfWeek, startDayHour, endDayHour, cellDuration, excludedDays,
  );
  const currentTime = moment(currTime as CurrentTime);

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

export const allDayCells: PureComputed<
  [ViewCell[][]], AllDayCell[]
> = viewCells => viewCells[0].map(cell => ({
  startDate: moment(cell.startDate).startOf('day').toDate(),
  endDate: moment(cell.startDate).add(1, 'day').startOf('day').toDate(),
}));

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
