import moment from 'moment';

const CELL_GAP = 0.32;
const CELL_BOUND_OFFSET_PX = 2;

export const sliceAppointmentByWeek = (
  appointment,
  monthCells,
) => {
  const nextAppointments = [];
  const leftBound = moment(monthCells[0][0].value).startOf('day');
  const rightBound = moment(leftBound).add(7, 'days');
  const { start, end } = appointment;

  while (leftBound.isBefore(end)) {
    if (start.isBetween(leftBound, rightBound, null, '[)')
      && !end.isBetween(leftBound, rightBound, null, '()')) {
      nextAppointments.push({
        ...appointment,
        start,
        end: moment(rightBound).add(-1, 'hours').endOf('day'),
      });
    }
    if (!start.isBetween(leftBound, rightBound, null, '[)')
      && end.isBetween(leftBound, rightBound, null, '(]')) {
      nextAppointments.push({
        ...appointment,
        start: moment(leftBound),
        end,
      });
    }

    if (start.isBefore(leftBound) && end.isAfter(rightBound)) {
      nextAppointments.push({
        ...appointment,
        start: moment(leftBound),
        end: moment(rightBound).add(-1, 'hours').endOf('day'),
      });
    }
    if (start.isBetween(leftBound, rightBound, null, '[)')
      && end.isBetween(leftBound, rightBound, null, '()')) {
      nextAppointments.push(appointment);
    }
    leftBound.add(7, 'days');
    rightBound.add(7, 'days');
  }
  return nextAppointments;
};

const getCellRect = (date, monthCells, cellElements, takePrev) => {
  const startViewDate = moment(monthCells[0][0].value);
  const currentDate = moment(date);
  let cellIndex = currentDate.diff(startViewDate, 'days');
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

export const getRectByDates = (
  startDate,
  endDate,
  monthCells,
  cellElements,
) => {
  const firstCellRect = getCellRect(startDate, monthCells, cellElements, false);
  const lastCellRect = getCellRect(endDate, monthCells, cellElements, true);

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
