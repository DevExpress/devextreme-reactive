import moment from 'moment';

const CELL_GAP = 0.15;

export const sliceAppointmentByBoundaries = (appointment, leftBoundary, rightBoundary) => {
  let { start, end } = appointment;

  if (start.isSameOrAfter(rightBoundary) || end.isSameOrBefore(leftBoundary)) {
    return [];
  }
  if (start.isSameOrBefore(leftBoundary)) {
    start = moment(leftBoundary);
  }
  if (end.isSameOrAfter(rightBoundary)) {
    end = moment(rightBoundary);
  }

  return [{
    ...appointment,
    start,
    end,
  }];
};

export const getDayCellByDate = (times, date, takePrev = false) => {
  const rowIndex = times.findIndex((timeCell) => {
    const startTime = moment(timeCell.start);
    const endTime = moment(timeCell.end);
    const cellStart = moment(date).hour(startTime.hours()).minutes(startTime.minutes());
    const cellEnd = moment(date).hour(endTime.hours()).minutes(endTime.minutes());
    return moment(date).isBetween(cellStart, cellEnd, null, takePrev ? '(]' : '[)');
  });

  const cellStartTime = moment(times[rowIndex].start);
  const cellStartDate = moment(date)
    .hour(cellStartTime.hours())
    .minutes(cellStartTime.minutes())
    .toDate();
  return {
    index: rowIndex,
    startDate: cellStartDate,
  };
};

const getCellRect = (date, times, cellDuration, cellElements, takePrev) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getDayCellByDate(times, date, takePrev);

  const cellElement = cellElements[cellIndex];
  const {
    top,
    left,
    width,
    height: cellHeight,
  } = cellElement.getBoundingClientRect();

  const timeOffset = moment(date).diff(cellStartDate, 'minutes');
  const topOffset = cellHeight * (timeOffset / cellDuration);
  let parentRect = { left: 0, top: 0, width: 0 };
  if (cellElement.offsetParent) {
    parentRect = cellElement.offsetParent.getBoundingClientRect();
  }
  return {
    top,
    left,
    width,
    topOffset,
    parentRect,
  };
};

export const getDayRectByDates = (
  startDate,
  endDate,
  {
    currentDate,
    timeScale,
    cellDuration,
    cellElements,
  },
) => {
  const firstCellRect = getCellRect(
    startDate, timeScale, cellDuration, cellElements, false,
  );
  const lastCellRect = getCellRect(endDate, timeScale, cellDuration, cellElements, true);

  const top = firstCellRect.top + firstCellRect.topOffset;
  const height = (lastCellRect.top + lastCellRect.topOffset) - top;

  return {
    width: firstCellRect.width - (firstCellRect.width * CELL_GAP),
    top: top - firstCellRect.parentRect.top,
    left: firstCellRect.left - firstCellRect.parentRect.left,
    parentWidth: firstCellRect.parentRect.width,
    height,
  };
};
