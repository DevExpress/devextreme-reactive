import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentMoment, GetAllDayCellIndexByAppointmentDataFn,
  SliceAppointmentsByBoundariesFn, SchedulerDateTime, Group,
} from '../../types';

export const allDayPredicate: PureComputed<[AppointmentMoment], boolean> = appointment => (
  appointment.end.diff(appointment.start, 'hours') > 23
  || !!appointment.allDay
);

export const getAllDayCellIndexByAppointmentData: GetAllDayCellIndexByAppointmentDataFn = (
  viewCellsData, date, appointment, takePrev,
) => {
  const currentDate = moment(date as SchedulerDateTime);
  let cellIndex = viewCellsData[0]
    .findIndex((timeCell) => {
      let isCorrectCell = true;
      if (timeCell.groupingInfo) {
        isCorrectCell = timeCell.groupingInfo.every((group: Group) => (
          group.id === appointment[group.fieldName]
        ));
      }
      return moment(date as SchedulerDateTime).isSame(timeCell.startDate, 'date') && isCorrectCell;
    });
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    cellIndex -= 1;
  }
  return cellIndex;
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
  const appointments = [];

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
