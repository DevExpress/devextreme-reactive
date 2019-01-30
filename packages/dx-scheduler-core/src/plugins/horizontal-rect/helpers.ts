import { GetCellRectHorizontal, GetHorizontalRectByDates } from '../../types';
import { getAllDayCellIndexByDate } from '../all-day-panel/helpers';
import { getMonthCellIndexByDate } from '../month-view/helpers';

const TOP_CELL_OFFSET = 0.32;
const CELL_BOUND_OFFSET_PX = 1;

const getCellRect: GetCellRectHorizontal = (
  date, viewCellsData, cellElements, takePrev, multiline,
) => {
  const cellIndex = multiline
    ? getMonthCellIndexByDate(viewCellsData, date, takePrev)
    : getAllDayCellIndexByDate(viewCellsData, date, takePrev);

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

export const getHorizontalRectByDates: GetHorizontalRectByDates = (
  startDate,
  endDate,
  {
    multiline,
    viewCellsData,
    cellElements,
  },
) => {
  const firstCellRect = getCellRect(startDate, viewCellsData, cellElements, false, multiline);
  const lastCellRect = getCellRect(endDate, viewCellsData, cellElements, true, multiline);

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
