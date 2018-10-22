import moment from 'moment';
import { HORIZONTAL_TYPE, VERTICAL_TYPE } from './constants';

export const computed = (getters, viewName, baseComputed, defaultValue) => {
  if (getters.currentView.name !== viewName && !!defaultValue) {
    return defaultValue;
  }
  return baseComputed(getters, viewName);
};

export const toPercentage = (value, total) => (value * 100) / total;

const createExcludedInterval = (day, start) => {
  const leftBound = moment(start.day(day));
  return [
    leftBound,
    moment(leftBound).hour(start.hour()).endOf('day'),
  ];
};

const excludedIntervals = (excludedDays, start) => excludedDays
  .map(day => (day === 0 ? 7 : day))
  .sort((a, b) => a - b)
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[i - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, []);

const byDayPredicate = (boundary, date) => (
  boundary.isSameOrAfter(date, 'day')
  && !boundary.isSame(boundary.clone().startOf('day'))
);

export const viewPredicate = (
  appointment, left, right,
  excludedDays = [],
  removeAllDayAppointments = false,
) => {
  const { start, end } = appointment;
  const isAppointmentInBoundary = end.isAfter(left) && start.isBefore(right);
  const inInterval = (date, interval) => date.isBetween(...interval, null, '[]');
  const isAppointmentInExcludedDays = !!excludedIntervals(excludedDays, moment(left))
    .find(interval => (inInterval(start, interval) && inInterval(end, interval)));

  const considerAllDayAppointment = removeAllDayAppointments
    ? moment(end).diff(start, 'hours') < 24 && !appointment.allDay
    : true;

  return isAppointmentInBoundary && !isAppointmentInExcludedDays && considerAllDayAppointment;
};

export const sortAppointments = (appointments, byDay = false) => appointments
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

export const findOverlappedAppointments = (sortedAppointments, byDay = false) => {
  const appointments = sortedAppointments.slice();
  const groups = [];
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

export const adjustAppointments = (groups, byDay = false) => groups.map((items) => {
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
            || (byDay && (maxBoundary.isBefore(appointments[index].start, 'day')))) {
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

export const calculateFirstDateOfWeek = (currentDate, firstDayOfWeek, excludedDays = []) => {
  const currentLocale = moment.locale();
  moment.updateLocale('tmp-locale', {
    week: { dow: firstDayOfWeek },
  });
  const firstDateOfWeek = moment(currentDate).startOf('week');
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

export const unwrapGroups = groups => groups.reduce((acc, { items, reduceValue }) => {
  acc.push(...items.map(appointment => ({
    start: appointment.start,
    end: appointment.end,
    dataItem: appointment.dataItem,
    offset: appointment.offset,
    reduceValue,
  })));
  return acc;
}, []);

export const getAppointmentStyle = ({
  top, left,
  width, height,
}) => ({
  height,
  width: `${width}%`,
  transform: `translateY(${top}px)`,
  left: `${left}%`,
  position: 'absolute',
});

const rectCalculatorBase = (
  appointment,
  getRectByDates,
  options,
) => getRectByDates(appointment.start, appointment.end, options);

const horizontalRectCalculator = (
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

const verticalRectCalculator = (
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

export const calculateRectByDateIntervals = (type, intervals, rectByDates, rectByDatesMeta) => {
  const { growDirection, multiline } = type;
  const sorted = sortAppointments(intervals, multiline);
  const grouped = findOverlappedAppointments(sorted, multiline);

  const rectCalculator = growDirection === HORIZONTAL_TYPE
    ? horizontalRectCalculator
    : verticalRectCalculator;

  return unwrapGroups(adjustAppointments(grouped, multiline))
    .map(appointment => rectCalculator(appointment, { rectByDates, multiline, rectByDatesMeta }));
};
