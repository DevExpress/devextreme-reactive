import moment from 'moment';
import {
  GetCellByDateFn, GetVerticalRectByDatesFn, GetCellRectVerticalFn, SchedulerDateTime,
} from '../../types';

const CELL_GAP_PX = 10;
const CELL_BOUND_HORIZONTAL_OFFSET_PX = 1;
const CELL_BOUND_VERTICAL_OFFSET_PX = 4;

export const getCellByDate: GetCellByDateFn = (viewCellsData, date, takePrev = false) => {
  const cellIndex =
    viewCellsData[0].findIndex(timeCell => moment(date as SchedulerDateTime)
      .isSame(timeCell.startDate, 'date'));

  const rowIndex = viewCellsData.findIndex(timeCell => moment(date as SchedulerDateTime)
    .isBetween(
      timeCell[cellIndex].startDate,
      timeCell[cellIndex].endDate,
      'seconds',
      takePrev ? '(]' : '[)'),
    );

  const totalCellIndex = (rowIndex * viewCellsData[0].length) + cellIndex;
  return {
    index: totalCellIndex,
    startDate: viewCellsData[rowIndex][cellIndex].startDate,
  };
};

const getCellRect: GetCellRectVerticalFn = (
  date, viewCellsData, cellDuration, cellElementsMeta, takePrev,
) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getCellByDate(viewCellsData, date, takePrev);

  const {
    top,
    left,
    width,
    height: cellHeight,
  } = cellElementsMeta.getCellRects[cellIndex]();

  const timeOffset = moment(date as SchedulerDateTime).diff(cellStartDate as Date, 'minutes');
  const topOffset = cellHeight * (timeOffset / cellDuration);
  const parentRect = cellElementsMeta.parentRect();

  return {
    top,
    left,
    width,
    topOffset,
    parentRect,
  };
};

export const getVerticalRectByDates: GetVerticalRectByDatesFn = (
  startDate,
  endDate,
  {
    viewCellsData,
    cellDuration,
    cellElementsMeta,
  },
) => {
  const firstCellRect = getCellRect(
    startDate, viewCellsData, cellDuration, cellElementsMeta, false,
  );
  const lastCellRect = getCellRect(endDate, viewCellsData, cellDuration, cellElementsMeta, true);

  const top = firstCellRect.top + firstCellRect.topOffset;
  const height = (lastCellRect.top + lastCellRect.topOffset) - top;

  return {
    width: firstCellRect.width - CELL_GAP_PX - CELL_BOUND_HORIZONTAL_OFFSET_PX,
    top: top - firstCellRect.parentRect.top + CELL_BOUND_HORIZONTAL_OFFSET_PX,
    left: firstCellRect.left - firstCellRect.parentRect.left + CELL_BOUND_HORIZONTAL_OFFSET_PX,
    parentWidth: firstCellRect.parentRect.width,
    height: height - CELL_BOUND_VERTICAL_OFFSET_PX,
  };
};
