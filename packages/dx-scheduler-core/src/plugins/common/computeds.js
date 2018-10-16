import moment from 'moment';
import { monthCellsData } from '../month-view/computeds';
import { calculateFirstDateOfWeek } from '../../utils';
import { getViewType } from './helpers';
import { HORIZONTAL_TYPE } from '../../constants';

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

export const availableViews = (views, viewName) => {
  if (!views) return [viewName];
  if (views.findIndex(view => viewName === view) === -1) {
    const nextViews = views.slice();
    nextViews.push(viewName);
    return nextViews;
  } return views;
};

export const viewCells = (
  currentViewType, currentDate, firstDayOfWeek, intervalCount, days, times,
) => {
  if (getViewType(currentViewType) === HORIZONTAL_TYPE) {
    return monthCellsData(currentDate, firstDayOfWeek, intervalCount);
  }

  const cells = [];
  times.forEach((time) => {
    const rowCells = [];
    days.forEach((day) => {
      const start = moment(time.start);
      const end = moment(time.end);
      const startDate = moment(day).hours(start.hours()).minutes(start.minutes()).toDate();
      const endDate = moment(day).hours(end.hours()).minutes(end.minutes()).toDate();
      rowCells.push({
        startDate,
        endDate,
      });
    });

    cells.push(rowCells);
  });
  return cells;
};

export const allDayCells = viewCellsData => viewCellsData[0].map(cell => ({
  startDate: moment(cell.startDate).startOf('day').toDate(),
  endDate: moment(cell.startDate).add(1, 'day').startOf('day').toDate(),
}));
