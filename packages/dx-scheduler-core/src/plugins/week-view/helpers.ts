import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentMoment, DayBoundaryPredicateFn,
  ReduceAppointmentByDayBoundsFn, NormalizeAppointmentDurationFn, ViewCell, GroupOrientation, Group,
} from '../../types';
import { VERTICAL_GROUP_ORIENTATION } from '../../constants';

export const sliceAppointmentByDay: PureComputed<
  [AppointmentMoment, number], AppointmentMoment[]
> = (appointment, cellDuration) => {
  const { start, end, dataItem } = appointment;
  if (start.isSame(end, 'day')) return [appointment];

  const minDuration = cellDuration / 2;
  const isShortOnFirstDay = start.clone().endOf('day').diff(start, 'minutes') < minDuration;
  const isShortOnSecondDay = end.clone().diff(end.clone().startOf('day'), 'minutes') < minDuration;

  return [
    isShortOnFirstDay ? {
      start: start.clone().endOf('day').add(-minDuration, 'minutes'),
      end: start.clone().endOf('day'),
      dataItem,
    } : {
      start, end: start.clone().endOf('day'), dataItem,
    },
    isShortOnSecondDay ? {
      start: end.clone().startOf('day'),
      end: end.clone().startOf('day').add(minDuration, 'minutes'),
      dataItem,
    } : {
      start: end.clone().startOf('day'), end, dataItem,
    },
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
  appointment, leftBound, rightBound, cellDuration,
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

  const minDuration = cellDuration / 2;
  const isShortOnFirstDay = endDayTime.clone().diff(appointment.start, 'minutes') < minDuration;
  const isShortOnSecondDay = appointment.end.clone().diff(startDayTime, 'minutes') < minDuration;

  if (isShortOnFirstDay) {
    return {
      ...appointment, start: endDayTime.clone().add(-minDuration, 'minutes'), end: endDayTime,
    };
  }

  if (isShortOnSecondDay) {
    return {
      ...appointment, start: startDayTime, end: startDayTime.clone().add(minDuration, 'minutes'),
    };
  }

  return {
    ...appointment,
    ...(appointment.start.isSameOrBefore(startDayTime) ? { start: startDayTime } : null),
    ...(appointment.end.isSameOrAfter(endDayTime) ? { end: endDayTime } : null),
  };
};

export const normalizeAppointmentDuration: NormalizeAppointmentDurationFn = (
  appointment, cellDuration,
) => {
  const minDuration = cellDuration / 2;
  const start = moment(appointment.start as Date);
  const end = moment(appointment.end as Date);

  if (end.diff(start, 'minutes') > minDuration) {
    return { ...appointment, start, end };
  }

  if (end.isSame(start.clone().add(minDuration, 'minutes'), 'day')) {
    return { ...appointment, start, end: start.clone().add(minDuration, 'minutes') };
  }

  return {
    ...appointment,
    start: start.clone().endOf('day').add(-minDuration, 'minutes'),
    end: start.clone().endOf('day'),
  };
};

export const timeScaleCells: PureComputed<
  [ViewCell[][], GroupOrientation, Group[][] | undefined], ViewCell[][]
> = (viewCellsData, groupOrientation, groups) => {
  if (groupOrientation === VERTICAL_GROUP_ORIENTATION) {
    const timeScaleHeight = viewCellsData.length / groups![groups!.length - 1].length;
    return viewCellsData.slice(0, timeScaleHeight);
  }
  return viewCellsData;
};
