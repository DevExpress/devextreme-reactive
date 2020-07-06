import moment from 'moment';
import {
  SliceAppointmentByWeekFn, GetMonthCellIndexByAppointmentDataFn,
  SchedulerDateTime, AppointmentMoment, ViewCell,
} from '../../types';
import { DAYS_IN_WEEK } from '../appointment-form/constants';
import { PureComputed } from '@devexpress/dx-core';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
import { checkCellGroupingInfo } from '../common/helpers';
import { addDateToKey } from '../../utils';

export const sliceAppointmentByWeek: SliceAppointmentByWeekFn = (timeBounds, appointment, step) => {
  const { left, right } = timeBounds;
  const pieces: AppointmentMoment[] = [];
  const { start, end, key, ...restFields } = appointment;
  let apptStart = start;
  let apptEnd = end;
  if (apptStart.isBefore(left)) apptStart = left.clone();
  if (apptEnd.isAfter(right)) apptEnd = right.clone();
  let pieceFrom = apptStart.clone();
  let pieceTo = apptStart.clone();
  let i = 0;
  while (pieceTo.isBefore(apptEnd)) {
    const currentRightBound = left.clone().add(step * i, 'days').subtract(1, 'second');
    if (currentRightBound.isAfter(apptStart)) {
      pieceTo = apptStart.clone().add(step * i, 'days');
      if (pieceTo.isAfter(currentRightBound)) {
        pieceTo = currentRightBound.clone();
      }
      if (pieceTo.isAfter(apptEnd)) {
        pieceTo = apptEnd.clone();
      }
      if (!pieceFrom.isSameOrAfter(pieceTo)) {
        pieces.push({
          start: pieceFrom,
          end: pieceTo,
          key: addDateToKey(key, pieceFrom),
          ...restFields,
        });
        pieceFrom = pieceTo.clone().add(1, 'second');
      }
    }
    i += 1;
  }
  return pieces;
};

export const getMonthCellIndexByAppointmentData: GetMonthCellIndexByAppointmentDataFn = (
  viewCellsData, viewMetaData, date, appointment, takePrev = false,
) => {
  const {
    groupOrientation,
    groupedByDate,
    groupCount,
  } = viewMetaData;

  const startViewDate = moment(viewCellsData[0][0].startDate);
  const currentDate = moment(date as SchedulerDateTime);
  let dayNumber = currentDate.diff(startViewDate, 'days');
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    dayNumber -= 1;
  }
  const weekNumber = Math.floor(dayNumber / DAYS_IN_WEEK);
  const dayOfWeek = dayNumber % DAYS_IN_WEEK;

  const columnIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? getMonthHorizontallyGroupedColumnIndex(
      viewCellsData, appointment, weekNumber, dayOfWeek, groupCount, groupedByDate,
    )
    : dayOfWeek;
  const rowIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? weekNumber
    : getMonthVerticallyGroupedRowIndex(
      viewCellsData, appointment, weekNumber, dayOfWeek, groupCount,
    );

  const totalCellIndex = rowIndex * viewCellsData[0].length + columnIndex;
  return totalCellIndex;
};

export const getMonthHorizontallyGroupedColumnIndex: PureComputed<
  [ViewCell[][], AppointmentMoment, number, number, number, boolean], number
> = (viewCellsData, appointment, weekNumber, dayOfWeek, groupCount, groupByDate) => {
  let columnIndex = -1;
  let currentColumnIndex = groupByDate ? dayOfWeek * groupCount : dayOfWeek;
  const cellsInGroupRow = groupByDate ? 1 : DAYS_IN_WEEK;

  while (columnIndex === -1) {
    const isCorrectCell = checkCellGroupingInfo(
      viewCellsData[weekNumber][currentColumnIndex], appointment,
    );
    if (isCorrectCell) {
      columnIndex = currentColumnIndex;
    }
    currentColumnIndex += cellsInGroupRow;
  }
  return columnIndex;
};

export const getMonthVerticallyGroupedRowIndex: PureComputed<
  [ViewCell[][], AppointmentMoment, number, number, number], number
> = (viewCellsData, appointment, weekNumber, dayOfWeek, groupCount) => {
  const rowsInOneGroup = viewCellsData.length / groupCount;
  let rowIndex = -1;
  let currentRowIndex = weekNumber;
  while (rowIndex === -1) {
    const isCorrectCell = checkCellGroupingInfo(
      viewCellsData[currentRowIndex][dayOfWeek], appointment,
    );
    if (isCorrectCell) {
      rowIndex = currentRowIndex;
    }
    currentRowIndex += rowsInOneGroup;
  }
  return rowIndex;
};
