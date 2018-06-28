import moment from 'moment';
import { getCellByDate } from './helpers';

const CELL_GAP = 0.15;

export const timeScale = (startDayHour, endDayHour, cellDuration, startViewDate) => {
  const result = [];
  const left = moment(startViewDate).startOf('hour').hour(startDayHour);
  const right = moment(startViewDate).startOf('hour').hour(endDayHour);
  while (left.isBefore(right)) {
    const startDate = left.toDate();
    left.add(cellDuration, 'minutes');
    result.push({ start: startDate, end: left.toDate() });
  }

  return result;
};

export const dayScale = (
  currentDate = new Date(),
  firsDayOfWeek = 0,
  dayCount = 7,
  except = [],
) => {
  const result = [];
  const date = moment(currentDate).startOf('hour');
  date.day(firsDayOfWeek);

  for (let index = 0; index < dayCount; index += 1) {
    if (except.findIndex(item => item === date.day()) === -1) {
      result.push(date.toDate());
    }
    date.add(1, 'days');
  }

  return result;
};

export const startViewDate = (days, times) => {
  const firstTimeOfRange = moment(times[0].start);
  const startDate = moment(days[0])
    .hour(firstTimeOfRange.hours())
    .minute(firstTimeOfRange.minutes());
  return startDate.toDate();
};

export const endViewDate = (days, times) => {
  const lastTimeOfRange = moment(times[times.length - 1].end);
  const startDate = moment(days[days.length - 1])
    .hour(lastTimeOfRange.hours())
    .minute(lastTimeOfRange.minutes());
  return startDate.toDate();
};

const getCellRect = (date, days, times, cellDuration, cellElements) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getCellByDate(days, times, date);

  const cellElement = cellElements[cellIndex];
  const {
    top,
    left,
    width,
    height: cellHeight,
  } = cellElement.getBoundingClientRect();
  const timeOffset = moment(date).diff(cellStartDate, 'minutes');
  const topOffset = cellHeight * (timeOffset / cellDuration);

  return {
    top,
    left,
    width,
    topOffset,
    parentRect: cellElement.offsetParent.getBoundingClientRect(),
  };
};

export const getRectByDates = (
  startDate,
  endDate,
  days,
  times,
  cellDuration,
  cellElements,
) => {
  const firstCellRect = getCellRect(startDate, days, times, cellDuration, cellElements);
  const lastCellRect = getCellRect(endDate, days, times, cellDuration, cellElements);

  const top = firstCellRect.top + firstCellRect.topOffset;
  const height = (lastCellRect.top + lastCellRect.topOffset) - top;

  return {
    width: firstCellRect.width - (firstCellRect.width * CELL_GAP),
    top: top - firstCellRect.parentRect.top,
    left: firstCellRect.left - firstCellRect.parentRect.left,
    height,
  };
};

