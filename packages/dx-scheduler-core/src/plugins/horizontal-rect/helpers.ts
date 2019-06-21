import { GetCellRectHorizontalFn, GetHorizontalRectByDatesFn } from '../../types';
import { getAllDayCellIndexByDate } from '../all-day-panel/helpers';
import { getMonthCellIndexByDate } from '../month-view/helpers';

const TOP_CELL_OFFSET = 0.32;
const CELL_BOUND_OFFSET_PX = 1;

const getCellRect: GetCellRectHorizontalFn = (
  date, viewCellsData, cellElementsMeta, takePrev, multiline,
) => {
  const cellIndex = multiline
    ? getMonthCellIndexByDate(viewCellsData, date, takePrev)
    : getAllDayCellIndexByDate(viewCellsData, date, takePrev);

  const {
    top,
    left,
    width,
    height,
  } = cellElementsMeta.getCellRects[cellIndex]();
  const parentRect = cellElementsMeta.parentRect();
  return {
    top,
    left,
    width,
    height,
    parentRect,
  };
};

export const getHorizontalRectByDates: GetHorizontalRectByDatesFn = (
  startDate,
  endDate,
  {
    multiline,
    viewCellsData,
    cellElementsMeta,
  },
) => {
  const firstCellRect = getCellRect(startDate, viewCellsData, cellElementsMeta, false, multiline);
  const lastCellRect = getCellRect(endDate, viewCellsData, cellElementsMeta, true, multiline);

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
