import moment from 'moment';

const CELL_GAP = 0.15;

export const getCellByDate = (viewCellsData, date, takePrev = false) => {
  const cellIndex = viewCellsData[0].findIndex(timeCell => moment(date).isSame(timeCell.startDate, 'date'));

  const rowIndex = viewCellsData.findIndex(timeCell => moment(date)
    .isBetween(timeCell[cellIndex].startDate, timeCell[cellIndex].endDate, null, takePrev ? '(]' : '[)'));

  const totalCellIndex = (rowIndex * viewCellsData[0].length) + cellIndex;
  return {
    index: totalCellIndex,
    startDate: viewCellsData[rowIndex][cellIndex].startDate,
  };
};

const getCellRect = (date, viewCellsData, cellDuration, cellElements, takePrev) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getCellByDate(viewCellsData, date, takePrev);

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

export const getVerticalRectByDates = (
  startDate,
  endDate,
  {
    viewCellsData,
    cellDuration,
    cellElements,
  },
) => {
  const firstCellRect = getCellRect(
    startDate, viewCellsData, cellDuration, cellElements, false,
  );
  const lastCellRect = getCellRect(endDate, viewCellsData, cellDuration, cellElements, true);

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
