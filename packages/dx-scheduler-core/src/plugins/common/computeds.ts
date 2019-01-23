import moment from 'moment';
import { calculateFirstDateOfWeek } from '../../utils';

const subtractSecond = date => moment(date).subtract(1, 'second').toDate();

export const dayScale = (
  currentDate,
  firstDayOfWeek,
  dayCount,
  excluded = [],
) => {
  const result = [];
  const date = firstDayOfWeek !== undefined
    ? moment(calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excluded))
    : moment(currentDate);
  for (let index = 0; index < dayCount; index += 1) {
    if (excluded.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }
  return result;
};

export const timeScale = (
  currentDate,
  firstDayOfWeek,
  startDayHour,
  endDayHour,
  cellDuration,
  excludedDays,
) => {
  const result = [];
  const startViewDate = firstDayOfWeek !== undefined
    ? calculateFirstDateOfWeek(currentDate, firstDayOfWeek, excludedDays)
    : currentDate;
  const left = moment(startViewDate).startOf('hour').hour(startDayHour);
  const right = moment(startViewDate).startOf('hour').hour(endDayHour);

  while (left.isBefore(right)) {
    const startDate = left.toDate();
    left.add(cellDuration, 'minutes');
    result.push({ start: startDate, end: left.toDate() });
  }
  result[result.length - 1].end = subtractSecond(result[result.length - 1].end);
  return result;
};

export const availableViewNames = (viewNames, viewName) => {
  if (!viewNames) return [viewName];
  if (viewNames.findIndex(view => viewName === view) === -1) {
    const nextViewNames = viewNames.slice();
    nextViewNames.push(viewName);
    return nextViewNames;
  } return viewNames;
};

export const viewCellsData = (
  currentDate, firstDayOfWeek,
  dayCount, excludedDays,
  startDayHour, endDayHour, cellDuration,
  currTime,
) => {
  const days = dayScale(currentDate, firstDayOfWeek, dayCount, excludedDays);
  const times = timeScale(
    currentDate, firstDayOfWeek, startDayHour, endDayHour, cellDuration, excludedDays,
  );
  const currentTime = moment(currTime);

  const cells = [];
  times.forEach((time) => {
    const rowCells = [];
    const start = moment(time.start);
    const end = moment(time.end);
    days.forEach((day) => {
      const startDate = moment(day).hours(start.hours()).minutes(start.minutes()).toDate();
      const endDate = moment(day).hours(end.hours()).minutes(end.minutes()).toDate();
      const today = currentTime.isSame(startDate, 'day');
      rowCells.push({
        startDate,
        endDate,
        today,
      });
    });

    cells.push(rowCells);
  });
  return cells;
};

export const allDayCells = viewCells => viewCells[0].map(cell => ({
  startDate: moment(cell.startDate).startOf('day').toDate(),
  endDate: moment(cell.startDate).add(1, 'day').startOf('day').toDate(),
}));

export const startViewDate = viewCells => moment(viewCells[0][0].startDate).toDate();

export const endViewDate = (viewCells) => {
  const lastRowIndex = viewCells.length - 1;
  const lastCellIndex = viewCells[lastRowIndex].length - 1;
  return subtractSecond(viewCells[lastRowIndex][lastCellIndex].endDate);
};
