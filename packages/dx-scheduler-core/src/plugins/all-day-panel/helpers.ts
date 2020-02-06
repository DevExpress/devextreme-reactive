import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentMoment, GetAllDayCellIndexByAppointmentDataFn,
  SliceAppointmentsByBoundariesFn, SchedulerDateTime, Group, ViewCell, GroupOrientation, AllDayCell,
} from '../../types';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
import { allDayCells } from '../common/computeds';
import { getGroupingInfoFromGroups } from '../integrated-grouping/helpers';
import { checkCellGroupingInfo } from '../common/helpers';

export const allDayPredicate: PureComputed<[AppointmentMoment], boolean> = appointment => (
  appointment.end.diff(appointment.start, 'hours') > 23
  || !!appointment.allDay
);

export const getAllDayCellIndexByAppointmentData: GetAllDayCellIndexByAppointmentDataFn = (
  viewCellsData, groupOrientation, numberOfGroups, date, appointment, takePrev,
) => {
  const currentDate = moment(date as SchedulerDateTime);

  const columnIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? getAllDayHorizontallyGroupedColumnIndex(viewCellsData, currentDate, appointment)
    : getAllDayVerticallyGroupedColumnIndex(viewCellsData, currentDate);
  const rowIndex = groupOrientation === HORIZONTAL_GROUP_ORIENTATION
    ? 0 : getAllDayVerticallyGroupedRowIndex(viewCellsData, appointment, numberOfGroups);

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
> = (viewCellsData, appointment, numberOfGroups) => {
  const index = viewCellsData.findIndex(viewCellsDataRow => checkCellGroupingInfo(
    viewCellsDataRow[0], appointment,
  ));
  return index * numberOfGroups / viewCellsData.length;
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

export const allDayCellsData: PureComputed<
  [ViewCell[][], Group[][] | undefined, GroupOrientation], AllDayCell[]
> = (viewCellsData, groups, groupOrientation) => groupOrientation === HORIZONTAL_GROUP_ORIENTATION
  || !groups
    ? allDayCells(viewCellsData)
    : allDayCellsFromViewCellsAndGroups(viewCellsData, groups);

const allDayCellsFromViewCellsAndGroups: PureComputed<
  [ViewCell[][], Group[][]], AllDayCell[]
> = (viewCellsData, groups) => groups[groups.length - 1].reduce((
  acc: AllDayCell[], group: Group, index: number,
) => {
  const groupingInfo = getGroupingInfoFromGroups(groups, index) as Group[];
  return [
    ...acc,
    ...viewCellsData[0].map(({
      startDate,
    }) => ({
      startDate: moment(startDate).startOf('day').toDate(),
      endDate: moment(startDate).add(1, 'day').startOf('day').toDate(),
      groupingInfo,
    })),
  ];
}, [] as AllDayCell[]);
