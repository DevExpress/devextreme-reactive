import moment from 'moment';

const CELL_GAP = 0.15;

export const timeUnits = (startDayHour = 0, endDayHour = 24, cellDuration = 30) => {
  const result = [];
  const left = moment().startOf('hour').hour(startDayHour);
  const right = moment().startOf('hour').hour(endDayHour);
  while (left.isBefore(right)) {
    result.push([
      [left.hour(), left.minute()],
    ]);
    left.add(cellDuration, 'minutes');
    result[result.length - 1].push([
      left.hour(), left.minute(),
    ]);
  }

  return result;
};

export const dayUnits = (
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
  const firstTimeOfRange = times[0][0];
  const startDate = moment(days[0]).hour(firstTimeOfRange[0]).minute(firstTimeOfRange[1]);
  return startDate.toDate();
};

export const endViewDate = (days, times) => {
  const lastTimeOfRange = times[times.length - 1][1];
  const startDate = moment(days[days.length - 1])
    .hour(lastTimeOfRange[0])
    .minute(lastTimeOfRange[1]);
  return startDate.toDate();
};

export const getCellByDate = (days, times, date) => {
  const rowIndex = times.findIndex((timeCell) => {
    const cellStart = moment(date).hour(timeCell[0][0]).minutes(timeCell[0][1]);
    const cellEnd = moment(date).hour(timeCell[1][0]).minutes(timeCell[1][1]);
    return moment(date).isBetween(cellStart, cellEnd, null, '[)');
  });

  const cellIndex = days.findIndex(day => moment(date).isSame(day, 'date'));
  const cellStartDate = moment(days[cellIndex])
    .hour(times[rowIndex][0][0])
    .minutes(times[rowIndex][0][1])
    .toDate();
  const totalCellIndex = (rowIndex * days.length) + cellIndex;
  return {
    index: totalCellIndex,
    startDate: cellStartDate,
  };
};

export const getCoordinatesByDate = (
  days,
  times,
  cellDuration,
  date,
  getCellElement,
) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getCellByDate(days, times, date);
  const {
    width: cellWidth,
    height: cellHeight,
    top: cellTop,
    left: cellLeft,
  } = getCellElement(cellIndex).getBoundingClientRect();
  const timeOffset = moment(date).diff(cellStartDate, 'minutes');
  const topOffset = cellHeight * (timeOffset / cellDuration);

  return {
    width: cellWidth - (cellWidth * CELL_GAP),
    top: cellTop + topOffset,
    left: cellLeft,
    height: 100,
  };
};

