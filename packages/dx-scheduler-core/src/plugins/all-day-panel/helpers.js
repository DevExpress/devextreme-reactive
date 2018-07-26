import moment from 'moment';

const CELL_GAP = 0.32;
const CELL_BOUND_OFFSET_PX = 2;

export const allDayPredicate = appointment => appointment.end.diff(appointment.start, 'hours') > 23;

const getCellRect = (date, dayScale, cellElements, takePrev) => {
  const currentDate = moment(date);
  let cellIndex = dayScale.findIndex(day => moment(day).day() === currentDate.day());
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    cellIndex -= 1;
  }

  const cellElement = cellElements[cellIndex];
  const {
    top,
    left,
    width,
    height,
  } = cellElement.getBoundingClientRect();
  let parentRect = { left: 0, top: 0, width: 0 };
  if (cellElement.offsetParent) {
    parentRect = cellElement.offsetParent.getBoundingClientRect();
  }
  return {
    top,
    left,
    width,
    height,
    parentRect,
  };
};

export const getAllDayRects = (
  startDate,
  endDate,
  dayScale,
  cellElements,
) => {
  const firstCellRect = getCellRect(startDate, dayScale, cellElements, false);
  const lastCellRect = getCellRect(endDate, dayScale, cellElements, true);

  const top = firstCellRect.top + (firstCellRect.height * CELL_GAP);
  const height = firstCellRect.height - (firstCellRect.height * CELL_GAP);

  return {
    top: top - firstCellRect.parentRect.top,
    left: (firstCellRect.left - firstCellRect.parentRect.left) + CELL_BOUND_OFFSET_PX,
    width: ((lastCellRect.left - firstCellRect.left) + firstCellRect.width) - CELL_BOUND_OFFSET_PX,
    height,
    parentWidth: firstCellRect.parentRect.width,
  };
};
