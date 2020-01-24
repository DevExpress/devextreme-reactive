import moment from 'moment';
import {
  GetCellByAppointmentDataFn, GetVerticalRectByAppointmentDataFn,
  GetCellRectVerticalFn, SchedulerDateTime, ViewCell, AppointmentMoment,
} from '../../types';
import { PureComputed } from '@devexpress/dx-core';
import { VERTICAL_GROUP_ORIENTATION } from '../../constants';

const CELL_GAP_PX = 10;
const CELL_BOUND_HORIZONTAL_OFFSET_PX = 1;
const CELL_BOUND_VERTICAL_OFFSET_PX = 4;

export const getVerticalCellIndexByAppointmentData: GetCellByAppointmentDataFn = (
  appointment, viewCellsData, groupOrientation, groupsNumber, date, takePrev = false,
) => {
  const columnIndex = groupOrientation === VERTICAL_GROUP_ORIENTATION
    ? getVerticallyGroupedColumnIndex(viewCellsData, date)
    : getHorizontallyGroupedColumnIndex(appointment, viewCellsData, date);
  const rowIndex = groupOrientation === VERTICAL_GROUP_ORIENTATION
    ? getVerticallyGroupedRowIndex(
      appointment, viewCellsData, date, columnIndex, takePrev, groupsNumber,
    ) : getHorizontallyGroupedRowIndex(viewCellsData, date, columnIndex, takePrev);

  const totalCellIndex = (rowIndex * viewCellsData[0].length) + columnIndex;
  return {
    index: totalCellIndex,
    startDate: viewCellsData[rowIndex][columnIndex].startDate,
  };
};

export const getVerticallyGroupedColumnIndex: PureComputed<
  [ViewCell[][], SchedulerDateTime], number
> = (viewCellsData, date) => {
  return viewCellsData[0].findIndex((timeCell: ViewCell) => {
    return moment(date as SchedulerDateTime).isSame(timeCell.startDate, 'date');
  });
};

export const getHorizontallyGroupedColumnIndex: PureComputed<
  [AppointmentMoment, ViewCell[][], SchedulerDateTime], number
> = (appointment, viewCellsData, date) => {
  return viewCellsData[0].findIndex((timeCell: ViewCell) => {
    let isCorrectCell = true;
    if (timeCell.groupingInfo) {
      isCorrectCell = timeCell.groupingInfo.every(group => (
        group.id === appointment[group.fieldName]
      ));
    }
    return moment(date as SchedulerDateTime).isSame(timeCell.startDate, 'date') && isCorrectCell;
  });
};

export const getVerticallyGroupedRowIndex: PureComputed<
[AppointmentMoment, ViewCell[][], SchedulerDateTime, number, boolean, number], number
> = (appointment, viewCellsData, date, columnIndex, takePrev, groupsNumber) => {
  const timeTableHeight = viewCellsData.length / groupsNumber;
  let timeTableRowIndex = viewCellsData.findIndex((timeCell) => {
    return moment(date as SchedulerDateTime)
      .isBetween(
        timeCell[columnIndex].startDate,
        timeCell[columnIndex].endDate,
        'seconds',
        takePrev ? '(]' : '[)');
  });
  if (!viewCellsData[0][0].groupingInfo) return timeTableRowIndex;
  let isWrongCell = !viewCellsData[timeTableRowIndex][columnIndex].groupingInfo!.every(group => (
    group.id === appointment[group.fieldName]
  ));
  while (isWrongCell) {
    timeTableRowIndex += timeTableHeight;
    isWrongCell = !viewCellsData[timeTableRowIndex][columnIndex].groupingInfo!.every(group => (
      group.id === appointment[group.fieldName]
    ));
  }
  return timeTableRowIndex;
};

export const getHorizontallyGroupedRowIndex: PureComputed<
  [ViewCell[][], SchedulerDateTime, number, boolean], number
> = (viewCellsData, date, columnIndex, takePrev) => {
  return viewCellsData.findIndex(timeCell => moment(date as SchedulerDateTime)
    .isBetween(
      timeCell[columnIndex].startDate,
      timeCell[columnIndex].endDate,
      'seconds',
      takePrev ? '(]' : '[)'),
    );
};

const getCellRect: GetCellRectVerticalFn = (
  date, appointment, viewCellsData, cellDuration,
  cellElementsMeta, takePrev, groupOrientation, groupsNumber,
) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getVerticalCellIndexByAppointmentData(
    appointment, viewCellsData, groupOrientation, groupsNumber, date, takePrev,
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
  groupOrientation,
  groupsNumber,
  {
    viewCellsData,
    cellDuration,
    cellElementsMeta,
  },
) => {
  const firstCellRect = getCellRect(
    appointment.start.toDate(), appointment, viewCellsData,
    cellDuration, cellElementsMeta, false, groupOrientation, groupsNumber,
  );
  const lastCellRect = getCellRect(
    appointment.end.toDate(), appointment, viewCellsData,
    cellDuration, cellElementsMeta, true, groupOrientation, groupsNumber,
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
