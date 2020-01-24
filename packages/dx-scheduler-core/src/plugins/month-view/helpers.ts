import moment from 'moment';
import {
  SliceAppointmentByWeekFn, GetMonthCellIndexByAppointmentDataFn,
  SchedulerDateTime, AppointmentMoment, Group, ViewCell,
} from '../../types';
import { DAYS_IN_WEEK } from '../appointment-form/constants';
import { PureComputed } from '@devexpress/dx-core/src';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

export const sliceAppointmentByWeek: SliceAppointmentByWeekFn = (timeBounds, appointment, step) => {
  const { left, right } = timeBounds;
  const pieces: AppointmentMoment[] = [];
  const { start, end, ...restFields } = appointment;
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
        pieces.push({ start: pieceFrom, end: pieceTo, ...restFields });
        pieceFrom = pieceTo.clone().add(1, 'second');
      }
    }
    i += 1;
  }
  return pieces;
};

export const getMonthCellIndexByAppointmentData: GetMonthCellIndexByAppointmentDataFn = (
  viewCellsData, groupOrientation, groupByDate, groupsNumber, date, appointment, takePrev = false,
) => {
  const startViewDate = moment(viewCellsData[0][0].startDate);
  const currentDate = moment(date as SchedulerDateTime);
  let dayNumber = currentDate.diff(startViewDate, 'days');
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    dayNumber -= 1;
  }
  const weekNumber = Math.floor(dayNumber / DAYS_IN_WEEK);
  // const viewsNumber = viewCellsData[0].length / DAYS_IN_WEEK;
  // let currentDay = groupByDate
  //   ? (dayNumber % DAYS_IN_WEEK) * viewsNumber
  //   : dayNumber % DAYS_IN_WEEK;
  const dayOfWeek = dayNumber % DAYS_IN_WEEK;

  const columnIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? getHorizontallyGroupedColumnIndex(appointment, viewCellsData, weekNumber, dayOfWeek)
    : dayOfWeek;
  const rowIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? weekNumber
    : getVerticallyGroupedRowIndex(appointment, viewCellsData, weekNumber, dayOfWeek, groupsNumber);

  const totalCellIndex = rowIndex * viewCellsData[0].length + columnIndex;
  return totalCellIndex;
};

export const getHorizontallyGroupedColumnIndex: PureComputed<
  [AppointmentMoment, ViewCell[][], number, number], number
> = (appointment, viewCellsData, weekNumber, dayOfWeek) => {
  let columnIndex = -1;
  let currentColumnIndex = dayOfWeek;
  while (columnIndex === -1) {
    let isCorrectCell = true;
    if (viewCellsData[weekNumber][currentColumnIndex].groupingInfo) {
      isCorrectCell = viewCellsData[weekNumber][currentColumnIndex].groupingInfo!
        .every((group: Group) => (
          group.id === appointment[group.fieldName]
        ));
    }
    if (isCorrectCell) {
      columnIndex = currentColumnIndex;
    }
    currentColumnIndex += DAYS_IN_WEEK;
  }
  return columnIndex;
};

export const getVerticallyGroupedRowIndex: PureComputed<
  [AppointmentMoment, ViewCell[][], number, number, number], number
> = (appointment, viewCellsData, weekNumber, dayOfWeek, groupsNumber) => {
  const rowsInOneGroup = viewCellsData.length / groupsNumber;
  let rowIndex = -1;
  let currentRowIndex = weekNumber;
  while (rowIndex === -1) {
    let isCorrectCell = true;
    if (viewCellsData[currentRowIndex][dayOfWeek].groupingInfo) {
      isCorrectCell = viewCellsData[currentRowIndex][dayOfWeek].groupingInfo!
        .every((group: Group) => (
          group.id === appointment[group.fieldName]
        ));
    }
    if (isCorrectCell) {
      rowIndex = currentRowIndex;
    }
    currentRowIndex += rowsInOneGroup;
  }
  return rowIndex;
};
