import moment from 'moment';

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

export const filterAppointmentsByBoundary = (
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
) => {
  const startView = moment(startViewDate);
  const endView = moment(endViewDate);

  return appointments.filter((appointment) => {
    const startDayTime = moment(appointment.start)
      .hour(startView.hour())
      .minutes(startView.minutes());
    const endDayTime = moment(appointment.start)
      .hour(endView.hour())
      .minutes(endView.minutes());

    if (excludedDays.findIndex(day =>
      day === moment(appointment.start).day()) !== -1) return false;

    if (moment(appointment.start).isBefore(startDayTime)
      && moment(appointment.end).isSameOrBefore(startDayTime)) return false;

    if (moment(appointment.start).isSameOrAfter(endDayTime)
      && moment(appointment.end).isAfter(endDayTime)) return false;
    return true;
  });
};

export const removeAllDayAppointments = appointments =>
  appointments.filter(appointment =>
    moment(appointment.end).diff(moment(appointment.start), 'hours') < 24);

export const cutDayAppointments = (appointments, startViewDate, endViewDate) => {
  const startView = moment(startViewDate);
  const endView = moment(endViewDate);

  return appointments.map((appointment) => {
    const startDayTime = moment(appointment.start)
      .hour(startView.hour())
      .minutes(startView.minutes())
      .seconds(startView.seconds());
    const endDayTime = moment(appointment.start)
      .hour(endView.hour())
      .minutes(endView.minutes())
      .seconds(endView.seconds());

    const appointmentStart = moment(appointment.start);
    const appointmentEnd = moment(appointment.end);

    if (appointmentStart.isSameOrBefore(startDayTime)
      && appointmentEnd.isSameOrBefore(endDayTime)) {
      return {
        start: startDayTime.toDate(),
        end: appointment.end,
        dataItem: appointment.dataItem,
      };
    }
    if (appointmentStart.isSameOrAfter(startDayTime)
      && appointmentEnd.isSameOrBefore(endDayTime)) {
      return {
        start: appointment.start,
        end: appointment.end,
        dataItem: appointment.dataItem,
      };
    }
    if (appointmentStart.isSameOrBefore(startDayTime)
      && appointmentEnd.isSameOrAfter(endDayTime)) {
      return {
        start: startDayTime.toDate(),
        end: endDayTime.toDate(),
        dataItem: appointment.dataItem,
      };
    }
    if (appointmentStart.isSameOrAfter(startDayTime)
      && appointmentEnd.isSameOrAfter(endDayTime)) {
      return {
        start: appointment.start,
        end: endDayTime.toDate(),
        dataItem: appointment.dataItem,
      };
    }
    return appointment;
  });
};

export const momentAppointments = formattedAppointments =>
  formattedAppointments.map(appointment => ({
    start: moment(appointment.start),
    end: moment(appointment.end),
    dataItem: appointment.dataItem,
  }));

export const sortAppointments = appointments =>
  appointments.slice().sort((a, b) => {
    if (a.start.isBefore(b.start)) return -1;
    if (a.start.isAfter(b.start)) return 1;
    if (a.start.isSame(b.start)) {
      if (a.end.isBefore(b.end)) return 1;
      if (a.end.isAfter(b.end)) return -1;
    }
    return 0;
  });

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
      start: appointment.start.toDate(),
      end: appointment.end.toDate(),
      dataItem: appointment.dataItem,
      offset: appointment.offset,
      reduceValue,
    })));
    return acc;
  }, []);

const createExcludedInterval = (day, start) => {
  const leftBound = moment(start.day(day));
  return [
    leftBound,
    moment(leftBound).hour(start.hour()).endOf('day'),
  ];
};

const excludedIntervals = (excludedDays, start) => excludedDays
  .map(day => (day === 0 ? 7 : day))
  .sort()
  .reduce((acc, day, i, allDays) => {
    if (i && day === allDays[i - 1] + 1) {
      acc[i - 1][1].day(day);
    } else {
      acc.push(createExcludedInterval(day, start));
    }
    return acc;
  }, []);

export const predicate = (start, end, boundary, excludedDays) => {
  const { left, right } = boundary;

  const isAppointmentInBoundary = (
    start.isBetween(left, right) || end.isBetween(left, right)
    ||
    (start.isSameOrBefore(left) && end.isSameOrAfter(right))
  );

  const inInterval = (date, interval) => date.isBetween(...interval, null, '[]');
  const isAppointmentInExcludedDays = !!excludedIntervals(excludedDays, moment(left))
    .find(interval => (
      inInterval(start, interval) && inInterval(end, interval)
    ));

  return isAppointmentInBoundary && !isAppointmentInExcludedDays;
};
