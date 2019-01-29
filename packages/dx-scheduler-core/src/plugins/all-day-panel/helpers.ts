import * as moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentMoment, ViewCellData, TakePrevious,
  LeftBound, RightBound, ExcludedDays, AppointmentDate,
} from '../../types';

export const allDayPredicate: PureComputed<[AppointmentMoment], boolean> = appointment => (
  appointment.end.diff(appointment.start, 'hours') > 23
  || !!appointment.allDay
);

export const getAllDayCellIndexByDate: PureComputed<
  [ViewCellData[][], AppointmentDate, TakePrevious], number
> = (viewCellsData, date, takePrev) => {
  const currentDate = moment(date);
  let cellIndex = viewCellsData[0]
    .findIndex(day => moment(day.startDate).day() === currentDate.day());
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    cellIndex -= 1;
  }
  return cellIndex;
};

export const sliceAppointmentsByBoundaries: PureComputed<
  [AppointmentMoment, LeftBound, RightBound, ExcludedDays], AppointmentMoment[]
> = (appointment, left, right, excludedDays = []) => {
  const startDate = appointment.start.clone();
  const endDate = appointment.end.clone();
  let nextStart = startDate.clone();
  let nextEnd = endDate.clone();

  if (startDate.isBefore(left as Date)) {
    nextStart = moment(left as Date);
    nextStart.startOf('day');
  }
  if (endDate.isAfter(right as RightBound)) {
    nextEnd = moment(right);
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
