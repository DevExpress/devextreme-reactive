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

// export const adjustLeftAndWidth: PureComputed<
//   [number, number, number, number, number[]], any
// > = (left, width, offset, reduceValue, widthMultipliers) => {
//   let nextLeft = left;
//   let nextWidth = width;
//   const widthInPx = width / reduceValue;
//   for (let i = 0; i <= offset; i += 1) {
//     const previousWidth = nextWidth;
//     const currentWidth = reduceValue === i + 1
//       ? widthInPx : widthInPx * 5 / 3;
//     nextWidth = widthMultipliers[i] * currentWidth;
//     // nextLeft += previousWidth - widthMultipliers.reduce((acc, multiplier, index) => {
//     //   return (index > i ? acc : acc * multiplier);
//     // }, width);
//     nextLeft += previousWidth - nextWidth;
//   }
//   return ({
//     width: nextWidth,
//     left: nextLeft,
//   });
// };
// export const adjustLeftAndWidth: PureComputed<
//   [number, number, number, number, number[]], any
// > = (left, width, offset, reduceValue, widthMultipliers) => {
//   const nextLeft = left;
//   let nextWidth = width;
//   // const widthInPx = width / reduceValue;
//   for (let i = 0; i <= offset; i += 1) {
//     nextWidth *= widthMultipliers[i];
//   }
//   console.log(nextWidth)
//   return ({
//     width: nextWidth,
//     left: nextLeft,
//   });
// };

// export const adjustOneLevelAppointments: PureComputed<
//   [any[]], any[]
// > = (appointmentGroups) => {
//   return appointmentGroups.map((appointmentGroup) => {
//     const { items: appointments } = appointmentGroup;
//     const adjustedAppointments = appointments.reduce((nextAppointments, appointment, index) => {
//       const { offset: appointmentOffset } = appointment;
//       if (index === 0) {
//         return [{ ...appointment, widthMultipliers: [1] }];
//       }

//       const previousAppointment = nextAppointments[index - 1];
//       const { offset: previousAppointmentOffset } = previousAppointment;
//       let widthMultipliers = previousAppointment.widthMultipliers.slice();

//       if (appointmentOffset === previousAppointmentOffset) {
//         if (appointmentsOverlap(appointment, previousAppointment)) {
//           widthMultipliers[appointmentOffset] = widthMultipliers[appointmentOffset] * 0.95;
//           return [...nextAppointments, { ...appointment,  widthMultipliers }];
//         }

//         //TODO: process case when there is a big appointnment that overlaps the current and the previous with the same offset

//         widthMultipliers[appointmentOffset] = 1;
//         return [...nextAppointments, { ...appointment,  widthMultipliers }];
//       }

//       if (appointmentOffset > previousAppointmentOffset) {
//         widthMultipliers.push(1);
//         return [...nextAppointments, { ...appointment,  widthMultipliers }];
//       }

//       if (appointmentOffset < previousAppointmentOffset) {
//         console.log(appointmentOffset)
//         widthMultipliers = widthMultipliers.slice(0, appointmentOffset + 1);
//         // if (widthMultipliers[appointmentOffset] !== 1) {
//         const { appointment: parentAppointment } = findParentAppointment(
//           nextAppointments, appointment, index,
//           appointmentOffset, widthMultipliers[appointmentOffset],
//         );
//         if (!parentAppointment) {
//           widthMultipliers[appointmentOffset] = 1;
//         } else {
//           widthMultipliers[appointmentOffset] = parentAppointment
//             .widthMultipliers[appointmentOffset] * 0.95;
//         }
//         // }
//         return [
//           ...nextAppointments,
//           {
//             ...appointment,
//             widthMultipliers,
//           },
//         ];
//       }
//       return appointment;
//     }, []);
//     console.log(adjustedAppointments)
//     return {
//       ...appointmentGroup,
//       items: adjustedAppointments,
//     };
//   });
// };
// const findParentAppointment: PureComputed<
//   [any[], any, number, number, number], any
// > = (appointments, appointment, startIndex, offset, widthMultiplier) => {
//   let currentIndex = startIndex - 1;
//   while (currentIndex >= 0 && (appointments[currentIndex].offset !== offset
//     || appointments[currentIndex].widthMultipliers[offset] <= widthMultiplier
//     || !appointmentsOverlap(appointment, appointments[currentIndex]))) {
//     currentIndex -= 1;
//   }
//   return currentIndex === -1 ? {
//     appointment: undefined,
//     index: -1,
//   } : {
//     appointment: appointments[currentIndex],
//     index: currentIndex,
//   };
// };

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

  const { reduceValue, offset, width: relativeWidth, left: relativeLeft  } = appointment;
  console.log(appointment)
  const widthMultiplier = (relativeWidth! + relativeLeft!) < 1 ? 5 / 3 : 1;
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

export const intervalsOverlap: PureComputed<
  [moment.Moment, moment.Moment, moment.Moment], boolean
> = (firstIntervalStart, firstIntervalEnd, secondIntervalStart) => {
  return (secondIntervalStart.isSameOrAfter(firstIntervalStart)
    && secondIntervalStart.isBefore(firstIntervalEnd));
};

export const calculateLeftAndWidth: PureComputed<
  [any[], number], any[]
> = (appointmentGroups, cellDuration) => {
  const result = appointmentGroups.map((appointmentGroup) => {
    const { items } = appointmentGroup;
    const appointments = items.slice();

    const appointmentsMetaData = checkChildAppointment(
      appointments, [], 0, 1, cellDuration,
    );
    const { widths, leftOffsets } = appointmentsMetaData;

    console.log(widths)
    console.log(leftOffsets)
    const appointment = appointments[0];
    appointment.width = widths[0];
    appointment.left = leftOffsets[0];
    return {
      ...appointmentGroup,
      items: appointments,
    };

  });
  console.log(result)
  return appointmentGroups;
};

const checkChildAppointment: PureComputed<
  [any[], boolean[], number, number, number], any
> = (appointments, isDirectChild, currentIndex, childIndex, cellDuration) => {
  const currentAppointment = appointments[currentIndex];
  const childAppointment = appointments[childIndex];
  const appointmentOffset = childAppointment.offset;
  const nextIsDirectChild = [
    ...isDirectChild,
    intervalsOverlap(
      currentAppointment.start, moment(currentAppointment.start).add(cellDuration, 'minutes'),
      childAppointment.start,
    ),
  ];

  if (childIndex === appointments.length - 1
    || childAppointment.offset >= appointments[childIndex + 1].offset) {
    nextIsDirectChild.push(nextIsDirectChild[nextIsDirectChild.length - 1]);
    const widths = calculateWidths(nextIsDirectChild);
    const leftOffsets = calculateLeftOffsets(nextIsDirectChild, widths);
    const appointmentWidth = widths[appointmentOffset];
    childAppointment.width = appointmentWidth;
    childAppointment.left = 1 - appointmentWidth;
    console.log(nextIsDirectChild)
    return { widths, isDirectChild: nextIsDirectChild, leftOffsets };
  }

  const appointmentsMetaData = checkChildAppointment(
    appointments, nextIsDirectChild, childIndex, childIndex + 1, cellDuration,
  );
  const { widths, leftOffsets } = appointmentsMetaData;
  childAppointment.width = widths[appointmentOffset];
  childAppointment.left = leftOffsets[appointmentOffset];

  return appointmentsMetaData;
};

export const calculateWidths: PureComputed<
  [boolean[]], number[]
> = (isDirectChild) => {
  const widths = [] as number[];
  for (let i = 0; i < isDirectChild.length; i += 1) {
    if (i === 0) {
      widths.push(isDirectChild[i] ? 1 / isDirectChild.length : 1);
    } else {
      let previousIndirectIndex = i;
      while (previousIndirectIndex > 0 && isDirectChild[previousIndirectIndex - 1]) {
        previousIndirectIndex -= 1;
      }
      const baseWidth = previousIndirectIndex === 0 ? 1
        : widths[previousIndirectIndex - 1] * 0.95;
      widths.push(isDirectChild[i]
        ? baseWidth / (isDirectChild.length - previousIndirectIndex)
        : widths[i - 1] * 0.95);
    }
  }
  return widths;
};

export const calculateLeftOffsets: PureComputed<
  [boolean[], number[]], number[]
> = (isDirectChild, widths) => {
  const leftOffsets = [0];
  for (let i = 1; i < isDirectChild.length; i += 1) {
    // let nextIndirectIndex = i;
    // while (nextIndirectIndex < isDirectChild.length && isDirectChild[nextIndirectIndex]) {
    //   nextIndirectIndex += 1;
    // }
    leftOffsets.push(isDirectChild[i]
      ? leftOffsets[i - 1] + widths[i - 1] : 1 - widths[i]);
  }
  return leftOffsets;
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
  const adjusted1 = calculateLeftAndWidth(adjusted, cellDuration);

  const rects =  unwrapGroups(adjusted1)
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
