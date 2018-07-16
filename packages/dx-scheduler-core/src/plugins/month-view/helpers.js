import moment from 'moment';

const CELL_GAP = 0.3;
const CELL_BOUND_OFFSET = 0.01;

export const sliceAppointmentsByWeek2 = (
  appointments,
  monthCells,
) => {
  const nextAppointments = [];
  const dayStep = 7;

  appointments.forEach((appointment) => {
    let from = appointment.start;
    let i = 1;
    let to = moment(monthCells[0][0].value);
    while (to.isBefore(appointment.end)) {
      const daysFromStart = dayStep * i;
      to = moment(appointment.start).add(daysFromStart, 'days');
      const currentBound = moment(monthCells[0][0].value).add(daysFromStart, 'days');
      if (to.isAfter(currentBound)) to = moment(currentBound).add(-1, 'hours').endOf('day');
      if (to.isAfter(appointment.end)) to = appointment.end;

      nextAppointments.push({
        ...appointment,
        start: from,
        end: to,
      });
      from = moment(to.add(1, 'hours').startOf('day'));
      i += 1;
    }
  });
  return nextAppointments;
};

export const sliceAppointmentsByWeek = (
  appointments,
  monthCells,
) => {
  const nextAppointments = [];
  appointments.forEach((appointment) => {
    const leftBound = moment(monthCells[0][0].value).startOf('day');
    const rightBound = moment(leftBound).add(7, 'days');
    const { start, end } = appointment;

    while (leftBound.isBefore(end)) {
      if (start.isBetween(leftBound, rightBound, null, '[)')
        && !end.isBetween(leftBound, rightBound, null, '()')) {
        nextAppointments.push({
          ...appointment,
          start,
          end: moment(rightBound).add(-1, 'hours').endOf('day'),
        });
      }
      if (!start.isBetween(leftBound, rightBound, null, '[)')
        && end.isBetween(leftBound, rightBound, null, '(]')) {
        nextAppointments.push({
          ...appointment,
          start: moment(leftBound),
          end,
        });
      }

      if (start.isBefore(leftBound) && end.isAfter(rightBound)) {
        nextAppointments.push({
          ...appointment,
          start: moment(leftBound),
          end: moment(rightBound).add(-1, 'hours').endOf('day'),
        });
      }
      if (start.isBetween(leftBound, rightBound, null, '[)')
        && end.isBetween(leftBound, rightBound, null, '()')) {
        nextAppointments.push(appointment);
      }
      leftBound.add(7, 'days');
      rightBound.add(7, 'days');
    }
  });
  return nextAppointments;
};

const getCellRect = (date, monthCells, cellElements, takePrev) => {
  const startViewDate = moment(monthCells[0][0].value);
  const currentDate = moment(date);
  let cellIndex = currentDate.diff(startViewDate, 'days');
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    cellIndex -= 1;
  }

  const cellElement = cellElements[cellIndex];
  const {
    top,
    left,
    width,
    height,
  } = cellElement.getBoundingClientRect();
  let parentRect = { left: 0, top: 0, width: 0 };
  if (cellElement.offsetParent) {
    parentRect = cellElement.offsetParent.getBoundingClientRect();
  }
  return {
    top,
    left,
    width,
    height,
    parentRect,
  };
};

export const getRectByDates = (
  startDate,
  endDate,
  monthCells,
  cellElements,
) => {
  const firstCellRect = getCellRect(startDate, monthCells, cellElements, false);
  const lastCellRect = getCellRect(endDate, monthCells, cellElements, true);

  const top = firstCellRect.top + (firstCellRect.height * CELL_GAP);
  const height = firstCellRect.height - (firstCellRect.height * CELL_GAP);

  return {
    top: top - firstCellRect.parentRect.top,
    left: firstCellRect.left - firstCellRect.parentRect.left + (firstCellRect.width * CELL_BOUND_OFFSET),
    width: (lastCellRect.left - firstCellRect.left) + lastCellRect.width - (firstCellRect.width * CELL_BOUND_OFFSET),
    height,
    parentWidth: firstCellRect.parentRect.width,
  };
};
