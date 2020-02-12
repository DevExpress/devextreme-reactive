import moment from 'moment';
import {
  GetCellByAppointmentDataFn, GetVerticalRectByAppointmentDataFn,
  GetCellRectVerticalFn, SchedulerDateTime,
} from '../../types';
import { VERTICAL_GROUP_ORIENTATION } from '../../constants';
import {
  getWeekHorizontallyGroupedRowIndex, getWeekVerticallyGroupedRowIndex,
  getWeekHorizontallyGroupedColumnIndex, getWeekVerticallyGroupedColumnIndex,
} from '../week-view/helpers';

const CELL_GAP_PX = 10;
const CELL_BOUND_HORIZONTAL_OFFSET_PX = 1;
const CELL_BOUND_VERTICAL_OFFSET_PX = 4;

export const getVerticalCellIndexByAppointmentData: GetCellByAppointmentDataFn = (
  appointment, viewCellsData, viewMetaData, date, takePrev = false,
) => {
  const { groupOrientation, groupCount } = viewMetaData;

  const columnIndex = groupOrientation === VERTICAL_GROUP_ORIENTATION
    ? getWeekVerticallyGroupedColumnIndex(viewCellsData, date)
    : getWeekHorizontallyGroupedColumnIndex(viewCellsData, appointment, date);
  const rowIndex = groupOrientation === VERTICAL_GROUP_ORIENTATION
    ? getWeekVerticallyGroupedRowIndex(
      viewCellsData, appointment, date, columnIndex, takePrev, groupCount,
    ) : getWeekHorizontallyGroupedRowIndex(viewCellsData, date, columnIndex, takePrev);

  const cellIndex = (rowIndex * viewCellsData[0].length) + columnIndex;
  return {
    index: cellIndex,
    startDate: viewCellsData[rowIndex][columnIndex].startDate,
  };
};

const getCellRect: GetCellRectVerticalFn = (
  date, appointment, viewCellsData, cellDuration,
  cellElementsMeta, takePrev, viewMetaData,
) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getVerticalCellIndexByAppointmentData(
    appointment, viewCellsData, viewMetaData, date, takePrev,
  );

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

export const getVerticalRectByAppointmentData: GetVerticalRectByAppointmentDataFn = (
  appointment,
  viewMetaData,
  {
    viewCellsData,
    cellDuration,
    cellElementsMeta,
  },
) => {
  const firstCellRect = getCellRect(
    appointment.start.toDate(), appointment, viewCellsData,
    cellDuration, cellElementsMeta, false, viewMetaData,
  );
  const lastCellRect = getCellRect(
    appointment.end.toDate(), appointment, viewCellsData,
    cellDuration, cellElementsMeta, true, viewMetaData,
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
