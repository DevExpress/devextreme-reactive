import moment from 'moment';

const CELL_GAP = 0.15;

export const getCellByDate = (days, times, date, takePrev = false) => {
  const rowIndex = times.findIndex((timeCell) => {
    const startTime = moment(timeCell.start);
    const endTime = moment(timeCell.end);
    const cellStart = moment(date).hour(startTime.hours()).minutes(startTime.minutes());
    const cellEnd = moment(date).hour(endTime.hours()).minutes(endTime.minutes());
    return moment(date).isBetween(cellStart, cellEnd, null, takePrev ? '(]' : '[)');
  });

  const cellIndex = days.findIndex(day => moment(date).isSame(day, 'date'));
  const cellStartTime = moment(times[rowIndex].start);
  const cellStartDate = moment(days[cellIndex])
    .hour(cellStartTime.hours())
    .minutes(cellStartTime.minutes())
    .toDate();
  const totalCellIndex = (rowIndex * days.length) + cellIndex;
  return {
    index: totalCellIndex,
    startDate: cellStartDate,
  };
};

const getCellRect = (date, days, times, cellDuration, cellElements, takePrev) => {
  const {
    index: cellIndex,
    startDate: cellStartDate,
  } = getCellByDate(days, times, date, takePrev);

  const cellElement = cellElements[cellIndex];
  const {
    top,
    left,
    width,
    height: cellHeight,
  } = cellElement.getBoundingClientRect();
  const timeOffset = moment(date).diff(cellStartDate, 'minutes');
  const topOffset = cellHeight * (timeOffset / cellDuration);
  let parentRect = { left: 0, top: 0, width: 0 };
  if (cellElement.offsetParent) {
    parentRect = cellElement.offsetParent.getBoundingClientRect();
  }
  return {
    top,
    left,
    width,
    topOffset,
    parentRect,
  };
};

export const getRectByDates = (
  startDate,
  endDate,
  days,
  times,
  cellDuration,
  cellElements,
) => {
  const firstCellRect = getCellRect(startDate, days, times, cellDuration, cellElements, false);
  const lastCellRect = getCellRect(endDate, days, times, cellDuration, cellElements, true);

  const top = firstCellRect.top + firstCellRect.topOffset;
  const height = (lastCellRect.top + lastCellRect.topOffset) - top;

  return {
    width: firstCellRect.width - (firstCellRect.width * CELL_GAP),
    top: top - firstCellRect.parentRect.top,
    left: firstCellRect.left - firstCellRect.parentRect.left,
    parentWidth: firstCellRect.parentRect.width,
    height,
  };
};

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

export const sliceAppointmentByDay = (appointment) => {
  const { start, end, dataItem } = appointment;
  if (start.isSame(end, 'day')) {
    return [appointment];
  }
  return [
    { start, end: moment(start).endOf('day'), dataItem },
    { start: moment(end).startOf('day'), end, dataItem },
  ];
};

export const dayBoundaryPredicate = (
  appointment,
  leftBound, rightBound,
  excludedDays = [],
) => {
  const dayStart = moment(leftBound);
  const dayEnd = moment(rightBound);
  const startDayTime = moment(appointment.start)
    .hour(dayStart.hour())
    .minutes(dayStart.minutes());
  const endDayTime = moment(appointment.start)
    .hour(dayEnd.hour())
    .minutes(dayEnd.minutes());

  if (excludedDays.findIndex(day =>
    day === moment(appointment.start).day()) !== -1) return false;

  return (appointment.end.isAfter(startDayTime)
    && appointment.start.isBefore(endDayTime));
};

export const reduceAppointmentByDayBounds = (appointment, leftBound, rightBound) => {
  const dayStart = moment(leftBound);
  const dayEnd = moment(rightBound);
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

export const findOverlappedAppointments = (sortedAppointments) => {
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
    while (next && maxBoundary.isAfter(next.start)) {
      currentGroup.push(next);
      if (maxBoundary.isBefore(next.end)) maxBoundary = next.end;
      totalIndex += 1;
      next = appointments[totalIndex];
    }
  }
  return groups;
};

export const adjustAppointments = groups => groups.map((items) => {
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
          if (maxBoundary.isSameOrBefore(appointments[index].start)) {
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

export const unwrapGroups = groups =>
  groups.reduce((acc, { items, reduceValue }) => {
    acc.push(...items.map(appointment => ({
      start: appointment.start,
      end: appointment.end,
      dataItem: appointment.dataItem,
      offset: appointment.offset,
      reduceValue,
    })));
    return acc;
  }, []);
