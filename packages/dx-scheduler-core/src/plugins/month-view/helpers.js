import moment from 'moment';

const TOP_CELL_OFFSET = 0.3;
const CELL_BOUND_OFFSET_PX = 2;

export const sliceAppointmentByWeek = (timeBounds, appointment, step) => {
  const { left, right } = timeBounds;
  const pieces = [];
  const { start, end, ...restFields } = appointment;
  let apptStart = start;
  let apptEnd = end;
  if (apptStart.isBefore(left)) apptStart = left.clone();
  if (apptEnd.isAfter(right)) apptEnd = right.clone();
  let pieceFrom = apptStart.clone();
  let pieceTo = apptStart.clone();
  let i = 0;
  while (pieceTo.isBefore(apptEnd)) {
    const currentRigthBound = left.clone().add(step * i, 'days').subtract(1, 'second');
    if (currentRigthBound.isAfter(apptStart)) {
      pieceTo = apptStart.clone().add(step * i, 'days');
      if (pieceTo.isAfter(currentRigthBound)) {
        pieceTo = currentRigthBound.clone();
      }
      if (pieceTo.isAfter(apptEnd)) {
        pieceTo = apptEnd.clone();
      }
      if (!pieceFrom.isSame(pieceTo)) {
        pieces.push({ start: pieceFrom, end: pieceTo, ...restFields });
        pieceFrom = pieceTo.clone().add(1, 'second');
      }
    }
    i += 1;
  }
  return pieces;
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

  const top = firstCellRect.top + (firstCellRect.height * TOP_CELL_OFFSET);
  const height = firstCellRect.height - (firstCellRect.height * TOP_CELL_OFFSET);

  return {
    top: top - firstCellRect.parentRect.top,
    left: (firstCellRect.left - firstCellRect.parentRect.left) + CELL_BOUND_OFFSET_PX,
    width: ((lastCellRect.left - firstCellRect.left) + firstCellRect.width) - CELL_BOUND_OFFSET_PX,
    height,
    parentWidth: firstCellRect.parentRect.width,
  };
};
