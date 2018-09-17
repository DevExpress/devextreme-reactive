import moment from 'moment';

export const sliceAppointmentByBoundaries = (appointment, leftBoundary, rightBoundary) => {
  let { start, end } = appointment;

  if (start.isSameOrAfter(rightBoundary) || end.isSameOrBefore(leftBoundary)) {
    return [];
  }
  if (start.isSameOrBefore(leftBoundary)) {
    start = moment(leftBoundary);
  }
  if (end.isSameOrAfter(rightBoundary)) {
    end = moment(rightBoundary);
  }

  return [{
    ...appointment,
    start,
    end,
  }];
};
