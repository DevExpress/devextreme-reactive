import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentMoment, DayBoundaryPredicateFn, ReduceAppointmentByDayBoundsFn,
} from '../../types';

export const sliceAppointmentByDay: PureComputed<
  [AppointmentMoment], AppointmentMoment[]
> = (appointment) => {
  const { start, end, dataItem } = appointment;
  if (start.isSame(end, 'day')) {
    return [appointment];
  }
  return [
    { start, end: moment(start).endOf('day'), dataItem },
    { start: moment(end).startOf('day'), end, dataItem },
  ];
};

export const dayBoundaryPredicate: DayBoundaryPredicateFn = (
  appointment,
  leftBound, rightBound,
  excludedDays = [],
) => {
  const dayStart = moment(leftBound as Date);
  const dayEnd = moment(rightBound as Date);
  const startDayTime = moment(appointment.start)
    .hour(dayStart.hour())
    .minutes(dayStart.minutes());
  const endDayTime = moment(appointment.start)
    .hour(dayEnd.hour())
    .minutes(dayEnd.minutes());

  if (appointment.end.isBefore(dayStart) || appointment.start.isAfter(dayEnd)) return false;
  if (excludedDays.findIndex(day => day === moment(appointment.start).day()) !== -1) return false;
  return (appointment.end.isAfter(startDayTime)
    && appointment.start.isBefore(endDayTime));
};

export const reduceAppointmentByDayBounds: ReduceAppointmentByDayBoundsFn = (
  appointment, leftBound, rightBound,
) => {
  const dayStart = moment(leftBound as Date);
  const dayEnd = moment(rightBound as Date);
  const startDayTime = moment(appointment.start)
    .hour(dayStart.hour())
    .minutes(dayStart.minutes())
    .seconds(dayStart.seconds());
  const endDayTime = moment(appointment.start)
    .hour(dayEnd.hour())
    .minutes(dayEnd.minutes())
    .seconds(dayEnd.seconds());

  return {
    ...appointment,
    ...(appointment.start.isSameOrBefore(startDayTime) ? { start: startDayTime } : null),
    ...(appointment.end.isSameOrAfter(endDayTime) ? { end: endDayTime } : null),
  };
};
