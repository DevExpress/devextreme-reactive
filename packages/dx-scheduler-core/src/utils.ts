import moment from 'moment';
import { CustomFunction, PureComputed } from '@devexpress/dx-core';
import { RRule, RRuleSet } from 'rrule';
import { HORIZONTAL_TYPE, VERTICAL_TYPE } from './constants';
import {
  ComputedHelperFn, ViewPredicateFn,
  CalculateFirstDateOfWeekFn, AppointmentMoment,
  Interval, AppointmentGroup, AppointmentUnwrappedGroup,
  Rect, ElementRect, CalculateRectByDateAndGroupIntervalsFn, ViewMetaData,
} from './types';

export const computed: ComputedHelperFn = (getters, viewName, baseComputed, defaultValue) => {
  if (getters.currentView.name !== viewName && !!defaultValue) {
    return defaultValue;
  }
  return baseComputed(getters, viewName);
};

const appointmentHeightType = (appointment: AppointmentMoment, cellDuration: number) => {
  const durationRatio = appointment.end.clone().diff(appointment.start, 'minutes') / cellDuration;
  if (durationRatio === 1) return 'middle';
  if (durationRatio > 1) return 'long';
  return 'short';
};

export const toPercentage: PureComputed<
  [number, number]
> = (value, total) => (value * 100) / total;

const createExcludedInterval: CustomFunction<
  [number, moment.Moment], Interval
> = (day, start) => {
  const leftBound = moment(start.day(day));
  return [
    leftBound,
    moment(leftBound).hour(start.hour()).endOf('day'),
  ];
};

export const excludedIntervals: PureComputed<
  [number[], moment.Moment], Interval[]
> = (excludedDays, start) => excludedDays
  .map(day => (day === 0 ? 7 : day))
  .sort((a, b) => a - b)
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[acc.length - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, [] as Interval[]);

const byDayPredicate: PureComputed<
  [moment.Moment, moment.Moment], boolean
> = (boundary, date) => (
  boundary.isSameOrAfter(date, 'day')
  && !boundary.isSame(boundary.clone().startOf('day'))
);

const inInterval = (
  date: moment.Moment, interval: Interval,
) => date.isBetween(interval[0], interval[1], undefined, '[]');

export const viewPredicate: ViewPredicateFn = (
  appointment, left, right,
  excludedDays = [],
  removeAllDayAppointments = false,
) => {
  const { start, end } = appointment;
  const isAppointmentInBoundary = end.isAfter(left as Date)
    && start.isBefore(right as Date);

  const isAppointmentInExcludedDays = !!excludedIntervals(excludedDays, moment(left as Date))
    .find(interval => (inInterval(start, interval) && inInterval(end, interval)));
  const considerAllDayAppointment = removeAllDayAppointments
    ? moment(end).diff(start, 'hours') < 24 && !appointment.allDay
    : true;

  return isAppointmentInBoundary && !isAppointmentInExcludedDays && considerAllDayAppointment;
};

const compareByDay: PureComputed<
  [AppointmentMoment, AppointmentMoment], number
> = (first, second) => {
  if (first.start.isBefore(second.start, 'day')) return -1;
  if (first.start.isAfter(second.start, 'day')) return 1;
  return 0;
};

const compareByAllDay: PureComputed<
  [AppointmentMoment, AppointmentMoment], number
> = (first, second) => {
  if (first.allDay && !second.allDay) return -1;
  if (!first.allDay && second.allDay) return 1;
  return 0;
};

const compareByTime: PureComputed<
  [AppointmentMoment, AppointmentMoment], number
> = (first, second) => {
  if (first.start.isBefore(second.start)) return -1;
  if (first.start.isAfter(second.start)) return 1;
  if (first.end.isBefore(second.end)) return 1;
  if (first.end.isAfter(second.end)) return -1;
  return 0;
};

export const sortAppointments: PureComputed<
  [AppointmentMoment[]], AppointmentMoment[]
> = appointments => appointments
  .slice().sort((a, b) => compareByDay(a, b) || compareByAllDay(a, b) || compareByTime(a, b));

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

const isMidnight: PureComputed<
  [moment.Moment], boolean
> = date => date.isSame(date.clone().startOf('day'));

const maxBoundaryPredicate: PureComputed<
  [moment.Moment, Date], boolean
> = (maxBoundary, startDate) => ((maxBoundary.isBefore(startDate as Date, 'day'))
  || (isMidnight(maxBoundary) && maxBoundary.isSame(startDate as Date, 'day')));

const adjustAppointments: CustomFunction<
  [any[], boolean, number], any
> = (groups, isHorizontal, cellDuration) => (
  isHorizontal ? adjustHorizontalAppointments(groups)
    : adjustVerticalAppointments(groups, cellDuration)
);

export const adjustHorizontalAppointments: CustomFunction<
  [any[]], any
> = groups => groups.map((items) => {
  let offset = 0;
  let reduceValue = 1;
  const appointments = items.map((appointment: any) => ({ ...appointment }));
  const groupLength = appointments.length;
  for (let startIndex = 0; startIndex < groupLength; startIndex += 1) {
    const appointment = appointments[startIndex];
    if (appointment.offset === undefined) {
      let maxBoundary = appointment.end;
      appointment.offset = offset;
      for (let index = startIndex + 1; index < groupLength; index += 1) {
        if (appointments[index].offset === undefined) {
          if (maxBoundaryPredicate(maxBoundary, appointments[index].start)) {
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

export const adjustVerticalAppointments: CustomFunction<
  [any[], number], any
> = (groups, cellDuration) => groups.map((items) => {
  let offset = 0;
  let reduceValue = 1;
  const appointments = items.map((appointment: any) => ({ ...appointment }));
  const groupLength = appointments.length;
  for (let startIndex = 0; startIndex < groupLength; startIndex += 1) {
    const appointment = appointments[startIndex];
    let endDate = moment(appointment.start).add(cellDuration, 'minutes');
    if (endDate.isAfter(appointment.end)) {
      endDate = moment(appointment.end);
    }

    if (appointment.offset === undefined) {
      let maxBoundary = moment(appointment.end);
      appointment.offset = offset;
      for (let index = startIndex + 1; index < groupLength; index += 1) {
        if (appointments[index].offset === undefined) {
          if (maxBoundary.isSameOrBefore(appointments[index].start)) {
            maxBoundary = moment(appointments[index].end)
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

export const calculateFirstDateOfWeek: CalculateFirstDateOfWeekFn = (
  currentDate, firstDayOfWeek, excludedDays = [],
) => {
  const currentLocale = moment.locale();
  moment.updateLocale('tmp-locale', {
    week: { dow: firstDayOfWeek, doy: 1 }, // `doy` is required for TS using
  });
  const firstDateOfWeek = moment(currentDate as Date).startOf('week');
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

export const unwrapGroups: PureComputed<
  [AppointmentGroup[]], AppointmentUnwrappedGroup[]
> = groups => groups.reduce((acc, { items, reduceValue }) => {
  acc.push(...items.map(({ start, end, dataItem, offset, resources, ...restProps }) => ({
    start, end, dataItem, offset, reduceValue, resources,
    fromPrev: moment(start).diff(dataItem.startDate, 'minutes') > 1,
    toNext: moment(dataItem.endDate).diff(end, 'minutes') > 1,
    ...restProps,
  })));
  return acc;
}, [] as AppointmentUnwrappedGroup[]);

export const getAppointmentStyle: PureComputed<
  [Rect], React.CSSProperties
> = ({
  top, left,
  width, height,
}) => ({
  height,
  width: `${width}%`,
  transform: `translateY(${top}px)`,
  msTransform: `translateY(${top}px)`,
  left: `${left}%`,
  position: 'absolute',
});

const horizontalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, ViewMetaData, any], ElementRect
> = (
  appointment,
  viewMetaData,
  {
    rectByDates: getRectByAppointment,
    multiline,
    rectByDatesMeta: {
      cellElementsMeta,
      viewCellsData,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = getRectByAppointment(
    appointment,
    viewMetaData,
    {
      multiline,
      cellElementsMeta,
      viewCellsData,
    },
  );

  return {
    resources: appointment.resources,
    top: top + ((height / appointment.reduceValue) * appointment.offset),
    height: height / appointment.reduceValue,
    left: toPercentage(left, parentWidth),
    width: toPercentage(width, parentWidth),
    dataItem: appointment.dataItem,
    fromPrev: appointment.fromPrev,
    toNext: appointment.toNext,
    type: HORIZONTAL_TYPE,
  };
};

const verticalRectCalculator: CustomFunction<
  [AppointmentUnwrappedGroup, ViewMetaData, any], ElementRect
> = (
  appointment,
  viewMetaData,
  {
    rectByDates: getRectByAppointment,
    multiline,
    rectByDatesMeta: {
      viewCellsData,
      cellDuration,
      cellElementsMeta,
      excludedDays,
    },
  },
) => {
  const {
    top, left,
    width, height, parentWidth,
  } = getRectByAppointment(
    appointment,
    viewMetaData,
    {
      multiline,
      viewCellsData,
      cellDuration,
      excludedDays,
      cellElementsMeta,
    },
  );

  const { offset, width: relativeWidth, left: relativeLeft  } = appointment;
  const widthMultiplier = (relativeWidth! * 5 / 3 + relativeLeft!) <= 1 ? 5 / 3 : 1;
  return {
    resources: appointment.resources,
    top,
    height,
    left: toPercentage(left + relativeLeft! * width, parentWidth),
    width: toPercentage(relativeWidth! * width * widthMultiplier, parentWidth),
    dataItem: appointment.dataItem,
    fromPrev: appointment.fromPrev,
    toNext: appointment.toNext,
    durationType: appointmentHeightType(appointment, cellDuration),
    type: VERTICAL_TYPE,
    offset,
  };
};

export const intervalIncludes: PureComputed<
  [moment.Moment, moment.Moment, moment.Moment], boolean
> = (intervalStart, intervalEnd, date) => date.isSameOrAfter(intervalStart)
  && date.isBefore(intervalEnd);

export const createAppointmentForest: PureComputed<
  [any[], number], any
> = (appointmentGroups, cellDuration) => appointmentGroups.map((appointmentGroup) => {
  const { items } = appointmentGroup;
  let nextItems;
  let roots;
  if (items.length === 1) {
    nextItems = [{ ...items[0], children: [], depth: 0 }];
    roots = [0];
  } else {
    const {
      appointments, roots: appointmentTreeRoots,
    } = iterateTreeRoots(items, cellDuration);
    nextItems = appointments;
    roots = appointmentTreeRoots;
  }
  return {
    ...appointmentGroup,
    items: nextItems,
    roots,
  };
});

const iterateTreeRoots: PureComputed<
  [any[], number], any
> = (appointmentItems, cellDuration) => {
  const appointments = appointmentItems.map(props => ({ ...props }));
  const roots = [];
  let baseAppointmentId = 0;
  while (baseAppointmentId < appointments.length) {
    const appointment = appointments[baseAppointmentId];
    const { offset: appointmentOffset } = appointment;
    if (appointmentOffset === 0) {
      roots.push(baseAppointmentId);
      if (baseAppointmentId + 1 === appointments.length) {
        appointment.children = [];
      } else {
        appointment.treeDepth = visitAllChildren(appointments, baseAppointmentId, cellDuration, 0);
      }
      appointment.parent = undefined;
    }
    baseAppointmentId += 1;
  }
  return { appointments, roots };
};

const visitChild: PureComputed<
  [any[], number, number, number, boolean, number], any
> = (appointments, index, parentAppointment, cellDuration, isDirectChild, treeDepth) => {
  const appointment = appointments[index];
  appointment.isDirectChild = isDirectChild;
  appointment.parent = parentAppointment;
  const nextTreeDepth = treeDepth + 1;

  if (index === appointments.length - 1
    || appointment.end.isSameOrBefore(appointments[index + 1].start)) {
    appointment.children = [];
    appointment.treeDepth = 0;
    return nextTreeDepth;
  }

  const calculatedTreeDepth = visitAllChildren(
    appointments, index, cellDuration, treeDepth,
  );

  appointment.treeDepth = calculatedTreeDepth;
  return calculatedTreeDepth + 1;
};

const visitAllChildren: PureComputed<
  [any[], number, number, number], any
> = (appointments, appointmentIndex, cellDuration, treeDepth) => {
  const appointment = appointments[appointmentIndex];
  const { offset: appointmentOffset } = appointment;

  let maxAppointmentTreeDepth = 0;

  const children = [];

  let nextChildIndex = appointmentIndex + 1;
  while (nextChildIndex < appointments.length
    && appointments[nextChildIndex].offset !== appointmentOffset) {
    if (appointments[nextChildIndex].offset === appointmentOffset + 1) {
      const isDirectChild = intervalIncludes(
        appointment.start, moment(appointment.start).add(cellDuration, 'minutes'),
        appointments[nextChildIndex].start,
      );
      appointment.hasDirectChild = appointment.hasDirectChild || isDirectChild;
      const nextTreeDepth = visitChild(
        appointments, nextChildIndex, appointment, cellDuration, isDirectChild, treeDepth,
      );
      if (maxAppointmentTreeDepth < nextTreeDepth) {
        maxAppointmentTreeDepth = nextTreeDepth;
      }
      children.push(nextChildIndex);
    }
    nextChildIndex += 1;
  }
  appointment.children = children;

  return maxAppointmentTreeDepth;
};

const MAX_WIDTH = 1;
const INDIRECT_CHILD_WIDTH = 0.95;

export const calculateAppointmentsMetaData: PureComputed<
  [any[]], any[]
> = appointmentGroups => appointmentGroups.map((appointmentGroup) => {
  const { items, roots } = appointmentGroup;
  return {
    ...appointmentGroup,
    items: items.length === 1
      ? [{ ...items[0], left: 0, width: 1 }]
      : calculateRootsMetaData(items, roots),
  };
});

const calculateRootsMetaData: PureComputed<
  [any[], number[]], any[]
> = (appointmentItems, roots) => {
  const appointments = appointmentItems.slice();
  roots.forEach((rootIndex) => {
    const appointment = appointments[rootIndex];
    if (rootIndex + 1 === appointments.length) {
      appointment.width = 1;
      appointment.left = 0;
      appointment.hasDirectChildList = [];
    } else {
      const { left, width } = calculateAppointmentLeftAndWidth(
        appointment, undefined, MAX_WIDTH,
      );
      appointment.left = left;
      appointment.width = width;
      calculateChildrenMetaData(appointments, rootIndex, MAX_WIDTH);
    }

  });
  return appointments;
};

const calculateChildMetaData: PureComputed<
  [any[], number, number], any
> = (
  appointments, index, maxWidth,
) => {
  const appointment = appointments[index];
  const { left, width } = calculateAppointmentLeftAndWidth(
    appointment, appointment.parent, maxWidth,
  );
  appointment.left = left;
  appointment.width = width;

  if (appointment.children.length === 0) {
    return appointment;
  }

  return calculateChildrenMetaData(
    appointments, index, maxWidth,
  );
};

const calculateChildrenMetaData: PureComputed<
  [any[], number, number], any
> = (appointments, appointmentIndex, maxWidth) => {
  const appointment = appointments[appointmentIndex];
  const { children } = appointment;
  children.forEach((childIndex) => {
    calculateChildMetaData(appointments, childIndex, maxWidth);
  });

  return appointment;
};

export const calculateAppointmentLeftAndWidth: PureComputed<
  [any, any, number], any
> = (appointment, parentAppointment, maxWidth) => {
  const { hasDirectChild, treeDepth, isDirectChild } = appointment;
  if (!parentAppointment) {
    return ({
      width: hasDirectChild ? maxWidth / (treeDepth + 1) : maxWidth,
      left: 0,
    });
  }

  const {
    width: parentWidth,
    left: parentLeft,
    hasDirectChild: hasParentDirectChild,
  } = parentAppointment;
  const unoccupiedSpace = isDirectChild
    ? maxWidth - parentLeft - parentWidth : hasParentDirectChild
      ? (maxWidth - parentLeft) * INDIRECT_CHILD_WIDTH
      : parentWidth * INDIRECT_CHILD_WIDTH;
  const left = isDirectChild
    ? parentLeft + parentWidth : hasParentDirectChild
      ? parentLeft + (1 - INDIRECT_CHILD_WIDTH) * maxWidth
      : maxWidth - parentWidth * INDIRECT_CHILD_WIDTH;

  return ({
    width: hasDirectChild ? unoccupiedSpace / (treeDepth + 1) : unoccupiedSpace,
    left,
  });

};

export const groupByOffset: PureComputed<
  [any[]], any
> = appointmentGroups => appointmentGroups.map((appointmentGroup: any) => {
  const { items: appointments, reduceValue } = appointmentGroup;
  const groupedByOffset = [] as number[][];
  for (let i = 0; i < reduceValue; i += 1) {
    groupedByOffset.push([]);
  }

  appointments.forEach(({ offset }: any, index: number) => {
    groupedByOffset[offset].push(index);
  });
  return {
    ...appointmentGroup,
    groupedByOffset,
  };
});

export const updateLeftAndWidth: PureComputed<
  [any[]], any[]
> = appointmentGroups => appointmentGroups.map((appointmentGroup) => {
  const { items, groupedByOffset } = appointmentGroup;
  const appointments = items.slice();

  appointments.forEach((appointment: any, index: number) => {
    const result = findPreviousOverlappingAppointment(
      items, appointment, groupedByOffset, index,
    );
    if (result !== undefined) {
      const overlappingAppointment = appointments[result];
      const { left, width } = moveAppointmentToRight(overlappingAppointment);
      overlappingAppointment.left = left;
      overlappingAppointment.width = width;
      calculateChildrenMetaData(
        appointments, result, MAX_WIDTH,
      );
    }
  });
  return appointmentGroup;
});

const moveAppointmentToRight: PureComputed<
  [any], any
> = (appointment) => {
  const { offset, treeDepth, hasDirectChild } = appointment;
  const reduceValue = (offset + treeDepth + 1);
  const left = offset / reduceValue;
  const width = hasDirectChild ? MAX_WIDTH / reduceValue : 1 - left;
  return { left, width };
};

const findPreviousOverlappingAppointment: PureComputed<
  [any[], any, number[][], number], number | undefined
> = (appointments, appointment, groupedByOffset, appointmentIndex) => {
  let { offset: currentOffset } = appointment;
  currentOffset += 1;
  let overlappingAppointmentIndex;
  while (currentOffset < groupedByOffset.length && !overlappingAppointmentIndex) {
    let currentIndex = groupedByOffset[currentOffset].length - 1;
    while (currentIndex >= 0 && groupedByOffset[currentOffset][currentIndex] > appointmentIndex) {
      currentIndex -= 1;
    }
    if (currentIndex !== -1) {
      const previousAppointment = appointments[groupedByOffset[currentOffset][currentIndex]];
      const appointmentsOverlap = intervalIncludes(
        previousAppointment.start, previousAppointment.end, appointment.start,
      );
      if (appointmentsOverlap) {
        overlappingAppointmentIndex = groupedByOffset[currentOffset][currentIndex];
        if (intervalIncludes(
          previousAppointment.start, previousAppointment.end, appointment.end,
        )) {
          const { left, width } = reduceAppointmentsWidth(
            appointments, appointmentIndex, overlappingAppointmentIndex,
          );
          appointment.left = left;
          appointment.width = width;
        }
      }
    }
    currentOffset += 1;
  }
  return overlappingAppointmentIndex;
};

const reduceAppointmentsWidth: PureComputed<
  [any[], number, number], any
> = (appointments, appointmentIndex, overlappingAppointmentIndex) => {
  const overlappingAppointment = appointments[overlappingAppointmentIndex];
  const { treeDepth, offset } = overlappingAppointment;
  const reduceWidth = (offset) / (offset + treeDepth + 1);
  const appointment = appointments[appointmentIndex];
  return calculateAppointmentLeftAndWidth(
    appointment, appointment.parent, reduceWidth,
  );

};

export const calculateRectByDateAndGroupIntervals: CalculateRectByDateAndGroupIntervalsFn = (
  type, intervals, rectByDates, rectByDatesMeta, viewMetaData,
) => {
  const { growDirection, multiline } = type;
  const isHorizontal = growDirection === HORIZONTAL_TYPE;

  const sorted = intervals.map(sortAppointments);
  const grouped = sorted.reduce(((acc, sortedGroup) => [
    ...acc,
    ...findOverlappedAppointments(sortedGroup as AppointmentMoment[], isHorizontal),
  ]), [] as AppointmentMoment[]);

  const rectCalculator = isHorizontal
    ? horizontalRectCalculator
    : verticalRectCalculator;
  const { cellDuration } = rectByDatesMeta;

  const adjusted = adjustAppointments(grouped as any[], isHorizontal, cellDuration);
  const appointmentForest = createAppointmentForest(adjusted, cellDuration);
  const adjusted1 = calculateAppointmentsMetaData(appointmentForest);
  const groupedByOffset = groupByOffset(adjusted1);
  const updated = updateLeftAndWidth(groupedByOffset);
  const rects =  unwrapGroups(updated)
    .map(appointment => rectCalculator(
      appointment, viewMetaData,
      { rectByDates, multiline, rectByDatesMeta },
    ));
  return rects.sort((first, second) => first.offset! >= second.offset! ? 1 : -1);
};

const expandRecurrenceAppointment = (
  appointment: AppointmentMoment, leftBound: Date, rightBound: Date,
) => {
  const rightBoundUTC = moment(getUTCDate(rightBound)).toDate();
  const leftBoundUTC = moment(getUTCDate(leftBound)).toDate();
  const appointmentStartDate = moment(appointment.start).toDate();
  const options = {
    ...RRule.parseString(appointment.rRule),
    dtstart: moment(getUTCDate(appointmentStartDate)).toDate(),
  };
  const correctedOptions = options.until
    ? { ...options, until: moment(getUTCDate(options.until)).toDate() }
    : options;

  const rruleSet = getRRuleSetWithExDates(appointment.exDate);

  rruleSet.rrule(new RRule(correctedOptions));

  // According to https://github.com/jakubroztocil/rrule#important-use-utc-dates
  // we have to format the dates we get from RRuleSet to get local dates
  const datesInBoundaries = rruleSet.between(leftBoundUTC as Date, rightBoundUTC as Date, true)
    .map(formatDateToString);
  if (datesInBoundaries.length === 0) return [];

  const appointmentDuration = moment(appointment.end)
    .diff(appointment.start, 'minutes');

  return datesInBoundaries.map((startDate, index) => ({
    ...appointment,
    dataItem: {
      ...appointment.dataItem,
      startDate: moment(startDate).toDate(),
      endDate: moment(startDate).add(appointmentDuration, 'minutes').toDate(),
      parentData: appointment.dataItem,
    },
    start: moment(startDate),
    end: moment(startDate).add(appointmentDuration, 'minutes'),
  }));
};

export const filterByViewBoundaries: PureComputed<
  [AppointmentMoment, Date, Date, number[], boolean], AppointmentMoment[]
> = (appointment, leftBound, rightBound, excludedDays, removeAllDay) => {
  let appointments = [appointment];
  if (appointment.rRule) {
    appointments = expandRecurrenceAppointment(
      appointment as AppointmentMoment, leftBound as Date, rightBound as Date,
    );
  }
  return appointments.filter(appt => viewPredicate(
    appt, leftBound, rightBound, excludedDays, removeAllDay,
  ));
};

export const getUTCDate: PureComputed<[Date], number> = date =>
  Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
);

export const getRRuleSetWithExDates: PureComputed<
  [string | undefined], RRuleSet
> = (exDate) => {
  const rruleSet = new RRuleSet();
  if (exDate) {
    exDate.split(',').map((date: string) => {
      const currentExDate = moment(date).toDate();
      rruleSet.exdate(moment(getUTCDate(currentExDate)).toDate());
    });
  }
  return rruleSet;
};

export const formatDateToString = (date: Date | string | number) => moment.utc(date).format('YYYY-MM-DDTHH:mm');
