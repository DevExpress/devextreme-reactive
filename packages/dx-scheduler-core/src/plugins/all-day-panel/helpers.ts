import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentMoment, GetAllDayCellIndexByAppointmentDataFn,
  SliceAppointmentsByBoundariesFn, SchedulerDateTime, ViewCell,
} from '../../types';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
import { checkCellGroupingInfo } from '../common/helpers';

export const allDayPredicate: PureComputed<[AppointmentMoment], boolean> = appointment => (
  appointment.end.diff(appointment.start, 'hours') > 23
  || !!appointment.allDay
);

export const getAllDayCellIndexByAppointmentData: GetAllDayCellIndexByAppointmentDataFn = (
  viewCellsData, viewMetaData, date, appointment, takePrev,
) => {
  const currentDate = moment(date as SchedulerDateTime);
  const { groupOrientation, groupCount } = viewMetaData;

  const columnIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? getAllDayHorizontallyGroupedColumnIndex(viewCellsData, currentDate, appointment)
    : getAllDayVerticallyGroupedColumnIndex(viewCellsData, currentDate);
  const rowIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? 0 : getAllDayVerticallyGroupedRowIndex(viewCellsData, appointment, groupCount);

  let cellIndex = rowIndex * viewCellsData[0].length + columnIndex;
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    cellIndex -= 1;
  }
  return cellIndex;
};

export const getAllDayVerticallyGroupedColumnIndex: PureComputed<
  [ViewCell[][], moment.Moment], number
> = (viewCellsData, date) => viewCellsData[0].findIndex((timeCell) => {
  return date.isSame(timeCell.startDate, 'date');
});

export const getAllDayHorizontallyGroupedColumnIndex: PureComputed<
  [ViewCell[][], moment.Moment, AppointmentMoment], number
> = (viewCellsData, date, appointment) => viewCellsData[0].findIndex(timeCell => (
  date.isSame(timeCell.startDate, 'date') && checkCellGroupingInfo(timeCell, appointment)
));

export const getAllDayVerticallyGroupedRowIndex: PureComputed<
  [ViewCell[][], AppointmentMoment, number], number
> = (viewCellsData, appointment, groupCount) => {
  const index = viewCellsData.findIndex(viewCellsDataRow => checkCellGroupingInfo(
    viewCellsDataRow[0], appointment,
  ));
  return index * groupCount / viewCellsData.length;
};

export const sliceAppointmentsByBoundaries: SliceAppointmentsByBoundariesFn = (
  appointment, left, right, excludedDays = [],
) => {
  const startDate = appointment.start.clone();
  const endDate = appointment.end.clone();
  let nextStart = startDate.clone();
  let nextEnd = endDate.clone();

  if (startDate.isBefore(left as Date)) {
    nextStart = moment(left as Date);
    nextStart.startOf('day');
  }
  if (endDate.isAfter(right as Date)) {
    nextEnd = moment(right as Date);
    nextEnd.endOf('day');
  }
  if (excludedDays.findIndex(day => day === startDate.day()) !== -1) {
    while (excludedDays.findIndex(day => day === nextStart.day()) !== -1
      && nextStart.isSameOrBefore(endDate, 'day')) {
      nextStart.add(1, 'days').startOf('day');
    }
  }
  if (excludedDays.findIndex(day => day === endDate.day()) !== -1) {
    while (excludedDays.findIndex(day => day === nextEnd.day()) !== -1
      && nextStart.isSameOrAfter(startDate, 'day')) {
      nextEnd.add(-1, 'days').endOf('day');
    }
  }
  return [{ ...appointment, start: nextStart, end: nextEnd }];
};

export const sliceAppointmentsByDays: PureComputed<
  [AppointmentMoment, number[]], AppointmentMoment[]
> = (appointment, excludedDays = []) => {
  const startDate = appointment.start;
  const endDate = appointment.end;
  let nextStart = startDate.clone();
  const appointments = [] as AppointmentMoment[];

  while (nextStart.isBefore(endDate)) {
    if (excludedDays.findIndex(day => day === nextStart.day()) === - 1) {
      appointments.push({
        ...appointment,
        start: nextStart,
        end: moment(nextStart).endOf('day'),
      });
    }
    nextStart = moment(nextStart).add(1, 'day');
  }
  return appointments;
};
