import moment from 'moment';
import {
  GetCellByDateFn, GetVerticalRectByDatesFn, GetCellRectVerticalFn, SchedulerDateTime, ViewCell,
} from '../../types';

const CELL_GAP_PX = 10;
const CELL_BOUND_HORIZONTAL_OFFSET_PX = 1;
const CELL_BOUND_VERTICAL_OFFSET_PX = 4;

export const getVerticalCellIndex: GetCellByDateFn = (
  appointment, viewCellsData, date, takePrev = false,
) => {
  const cellIndex =
    viewCellsData[0].findIndex((timeCell: ViewCell) => {
      let isCorrectCell = true;
      if (timeCell.groupingInfo) {
        timeCell.groupingInfo.map((groupingItem) => {
          isCorrectCell = isCorrectCell && groupingItem.id === appointment[groupingItem.fieldName]
        });
      }
      return moment(date as SchedulerDateTime).isSame(timeCell.startDate, 'date') && isCorrectCell;
    });

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
  date, appointment, viewCellsData, cellDuration, cellElementsMeta, takePrev,
) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getVerticalCellIndex(appointment, viewCellsData, date, takePrev);

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
  appointment,
  {
    viewCellsData,
    cellDuration,
    cellElementsMeta,
  },
) => {
  const firstCellRect = getCellRect(
    appointment.start.toDate(), appointment, viewCellsData, cellDuration, cellElementsMeta, false,
  );
  const lastCellRect = getCellRect(
    appointment.end.toDate(), appointment, viewCellsData, cellDuration, cellElementsMeta, true,
  );

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
