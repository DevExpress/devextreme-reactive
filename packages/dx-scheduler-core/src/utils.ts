import * as moment from 'moment';
import { CustomFunction, PureComputed } from '@devexpress/dx-core';
import { HORIZONTAL_TYPE, VERTICAL_TYPE } from './constants';
import {
  ViewName, AppointmentModel, ExcludedDays,
  CurrentDate, FirstDayOfWeek, AppointmentMoment,
} from './types';

export const computed: CustomFunction<
  [any, ViewName, (...args: any[]) => any, any]
> = (getters, viewName, baseComputed, defaultValue) => {
  if (getters.currentView.name !== viewName && !!defaultValue) {
    return defaultValue;
  }
  return baseComputed(getters, viewName);
};

export const toPercentage: CustomFunction<
  [number, number]
> = (value, total) => (value * 100) / total;

type Interval = [moment.Moment, moment.Moment];
const createExcludedInterval: CustomFunction<
  [number, moment.Moment], Interval
> = (day, start) => {
  const leftBound = moment(start.day(day));
  return [
    leftBound,
    moment(leftBound).hour(start.hour()).endOf('day'),
  ];
};

const excludedIntervals: PureComputed<
  [ExcludedDays, moment.Moment], Interval[]
> = (excludedDays, start) => excludedDays
  .map(day => (day === 0 ? 7 : day))
  .sort((a, b) => a - b)
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[i - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, [] as Interval[]);

const byDayPredicate: CustomFunction<
  [moment.Moment, moment.Moment], boolean
> = (boundary, date) => (
  boundary.isSameOrAfter(date, 'day')
  && !boundary.isSame(boundary.clone().startOf('day'))
);

const inInterval = (
  date: moment.Moment, interval: Interval,
) => date.isBetween(interval[0], interval[1], undefined, '[]'); // null -> undefined

export const viewPredicate: PureComputed<
  [AppointmentMoment, Date, Date, ExcludedDays?, boolean?], boolean
> = (
  appointment, left, right,
  excludedDays = [],
  removeAllDayAppointments = false,
) => {
  const { start, end } = appointment;
  const isAppointmentInBoundary = end.isAfter(left as Date) && start.isBefore(right as Date);

  const isAppointmentInExcludedDays = !!excludedIntervals(excludedDays, moment(left))
    .find(interval => (inInterval(start, interval) && inInterval(end, interval)));
  const considerAllDayAppointment = removeAllDayAppointments
    ? moment(end).diff(start, 'hours') < 24 && !appointment.allDay
    : true;

  return isAppointmentInBoundary && !isAppointmentInExcludedDays && considerAllDayAppointment;
};

export const sortAppointments: PureComputed<
  [AppointmentMoment[], boolean], AppointmentMoment[]
> = (appointments, byDay = false) => appointments
  .slice().sort((a, b) => {
    const compareValue = byDay ? 'day' : undefined;
    if (a.start.isBefore(b.start, compareValue)) return -1;
    if (a.start.isAfter(b.start, compareValue)) return 1;
    if (a.start.isSame(b.start, compareValue)) {
      if (a.end.isBefore(b.end)) return 1;
      if (a.end.isAfter(b.end)) return -1;
    }
    return 0;
  });

export const findOverlappedAppointments: CustomFunction<
  [AppointmentMoment[], boolean], any[]
> = (sortedAppointments, byDay = false) => {
  const appointments = sortedAppointments.slice();
  const groups: AppointmentMoment[][] = [];
  let totalIndex = 0;

  while (totalIndex < appointments.length) {
    groups.push([]);
    const current = appointments[totalIndex];
    const currentGroup = groups[groups.length - 1];
    let next = appointments[totalIndex + 1];
    let maxBoundary = current.end;

    currentGroup.push(current);
    totalIndex += 1;
    while (next && (maxBoundary.isAfter(next.start)
      || (byDay && byDayPredicate(maxBoundary, next.start)))) {
      currentGroup.push(next);
      if (maxBoundary.isBefore(next.end)) maxBoundary = next.end;
      totalIndex += 1;
      next = appointments[totalIndex];
    }
  }
  return groups;
};

const isMidnight: CustomFunction<
  [moment.Moment], boolean
> = date => date.isSame(date.clone().startOf('day'));

const maxBoundaryPredicate: CustomFunction<
  [moment.Moment, Date], boolean
> = (maxBoundary, startDate) => ((maxBoundary.isBefore(startDate, 'day'))
  || (isMidnight(maxBoundary) && maxBoundary.isSame(startDate, 'day')));

export const adjustAppointments: CustomFunction<
  [any[], boolean], any
> = (groups, byDay = false) => groups.map((items) => {
  let offset = 0;
  let reduceValue = 1;
  const appointments = items.slice();
  const groupLength = appointments.length;
  for (let startIndex = 0; startIndex < groupLength; startIndex += 1) {
    const appointment = appointments[startIndex];
    if (appointment.offset === undefined) {
      let maxBoundary = appointment.end;
      appointment.offset = offset;
      for (let index = startIndex + 1; index < groupLength; index += 1) {
        if (appointments[index].offset === undefined) {
          if ((!byDay && maxBoundary.isSameOrBefore(appointments[index].start))
            || (byDay && maxBoundaryPredicate(maxBoundary, appointments[index].start))) {
            maxBoundary = appointments[index].end;
            appointments[index].offset = offset;
          }
        }
      }

      offset += 1;
      if (reduceValue < offset) reduceValue = offset;
    }
  }
  return { items: appointments, reduceValue };
});

export const calculateFirstDateOfWeek: PureComputed<
  [CurrentDate, FirstDayOfWeek, ExcludedDays], Date
> = (currentDate, firstDayOfWeek, excludedDays = []) => {
  const currentLocale = moment.locale();
  moment.updateLocale('tmp-locale', {
    week: { dow: firstDayOfWeek, doy: 1 }, // !!!! doy
  });
  const firstDateOfWeek = moment(currentDate as CurrentDate).startOf('week');
  if (excludedDays.indexOf(firstDayOfWeek) !== -1) {
    excludedDays.slice().sort().forEach((day) => {
      if (day === firstDateOfWeek.day()) {
        firstDateOfWeek.add(1, 'days');
      }
    });
  }
  moment.locale(currentLocale);

  return firstDateOfWeek.toDate();
};

type GroupItem = {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
};

type AppointmentGroup = {
  items: GroupItem[];
  reduceValue: number;
};

type AppointmentUnwrappedGroup = {
  start: moment.Moment;
  end: moment.Moment;
  dataItem: AppointmentModel;
  offset: number;
  reduceValue: number;
};

export const unwrapGroups: CustomFunction<
  [AppointmentGroup[]], AppointmentUnwrappedGroup[]
> = groups => groups.reduce((acc, { items, reduceValue }) => {
  acc.push(...items.map(appointment => ({
    start: appointment.start,
    end: appointment.end,
    dataItem: appointment.dataItem,
    offset: appointment.offset,
    reduceValue,
  })));
  return acc;
}, [] as AppointmentUnwrappedGroup[]);

type ElementRect = {
  top: number,
  left: number,
  width: number,
  height: number,
};

export const getAppointmentStyle: CustomFunction<
  [ElementRect], any
> = ({
  top, left,
  width, height,
}) => ({
  height,
  width: `${width}%`,
  transform: `translateY(${top}px)`,
  left: `${left}%`,
  position: 'absolute',
});

const rectCalculatorBase: CustomFunction<
  [AppointmentUnwrappedGroup, (...args: any) => any, object], any
> = (
  appointment,
  getRectByDates,
  options,
) => getRectByDates(appointment.start, appointment.end, options);

type Rect = {
  top: number;
  height: number;
  left: number;
  width: number;
  dataItem: AppointmentModel;
  type: string;
};

const horizontalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, any], Rect
> = (
  appointment,
  {
    rectByDates,
    multiline,
    rectByDatesMeta: {
      cellElements,
      viewCellsData,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = rectCalculatorBase(
    appointment,
    rectByDates,
    {
      multiline,
      cellElements,
      viewCellsData,
    },
  );

  return {
    top: top + ((height / appointment.reduceValue) * appointment.offset),
    height: height / appointment.reduceValue,
    left: toPercentage(left, parentWidth),
    width: toPercentage(width, parentWidth),
    dataItem: appointment.dataItem,
    type: HORIZONTAL_TYPE,
  };
};

const verticalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, any], Rect
> = (
  appointment,
  {
    rectByDates,
    multiline,
    rectByDatesMeta: {
      viewCellsData,
      cellDuration,
      cellElements,
      excludedDays,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = rectCalculatorBase(
    appointment,
    rectByDates,
    {
      multiline,
      viewCellsData,
      cellDuration,
      excludedDays,
      cellElements,
    },
  );

  const widthInPx = width / appointment.reduceValue;

  return {
    top,
    height,
    left: toPercentage(left + (widthInPx * appointment.offset), parentWidth),
    width: toPercentage(widthInPx, parentWidth),
    dataItem: appointment.dataItem,
    type: VERTICAL_TYPE,
  };
};

export const calculateRectByDateIntervals: CustomFunction<
  [any, any, any, any], any
> = (type, intervals, rectByDates, rectByDatesMeta) => {
  const { growDirection, multiline } = type;
  const sorted = sortAppointments(intervals, multiline);
  const grouped = findOverlappedAppointments(sorted as AppointmentMoment[], multiline);

  const rectCalculator = growDirection === HORIZONTAL_TYPE
    ? horizontalRectCalculator
    : verticalRectCalculator;

  return unwrapGroups(adjustAppointments(grouped, multiline))
    .map(appointment => rectCalculator(appointment, { rectByDates, multiline, rectByDatesMeta }));
};
