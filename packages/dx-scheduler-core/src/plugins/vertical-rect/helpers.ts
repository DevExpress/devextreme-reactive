import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  ViewCellData, TakePrevious, CellByDate, CellDuration, VerticalCellRectByDate,
  CellElement, VerticalCellRect, VerticalPayload, AppointmentDate, EndDate,
} from '../../types';

const CELL_GAP_PX = 10;
const CELL_BOUND_HORIZONTAL_OFFSET_PX = 1;
const CELL_BOUND_VERTICAL_OFFSET_PX = 4;

export const getCellByDate: PureComputed<
  [ViewCellData[][], AppointmentDate, TakePrevious], CellByDate
> = (viewCellsData, date, takePrev = false) => {
  const cellIndex =
    viewCellsData[0].findIndex(timeCell => moment(date as Date).isSame(timeCell.startDate, 'date'));

  const rowIndex = viewCellsData.findIndex(timeCell => moment(date as Date)
    .isBetween(
      timeCell[cellIndex].startDate,
      timeCell[cellIndex].endDate,
      undefined,
      takePrev ? '(]' : '[)'),
    );

  const totalCellIndex = (rowIndex * viewCellsData[0].length) + cellIndex;
  return {
    index: totalCellIndex,
    startDate: viewCellsData[rowIndex][cellIndex].startDate,
  };
};

const getCellRect: PureComputed<
  [AppointmentDate, ViewCellData[][], CellDuration, CellElement[], TakePrevious], VerticalCellRect
> = (date, viewCellsData, cellDuration, cellElements, takePrev) => {
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

  const timeOffset = moment(date as Date).diff(cellStartDate as Date, 'minutes');
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

export const getVerticalRectByDates: PureComputed<
  [AppointmentDate, EndDate, VerticalPayload], VerticalCellRectByDate
> = (
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
    width: firstCellRect.width - CELL_GAP_PX - CELL_BOUND_HORIZONTAL_OFFSET_PX,
    top: top - firstCellRect.parentRect.top + CELL_BOUND_HORIZONTAL_OFFSET_PX,
    left: firstCellRect.left - firstCellRect.parentRect.left + CELL_BOUND_HORIZONTAL_OFFSET_PX,
    parentWidth: firstCellRect.parentRect.width,
    height: height - CELL_BOUND_VERTICAL_OFFSET_PX,
  };
};
