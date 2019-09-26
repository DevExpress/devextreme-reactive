import moment from 'moment';
import {
  SliceAppointmentByWeekFn, GetMonthCellIndexByDateFn, SchedulerDateTime, AppointmentMoment,
} from '../../types';

export const sliceAppointmentByWeek: SliceAppointmentByWeekFn = (timeBounds, appointment, step) => {
  const { left, right } = timeBounds;
  const pieces: AppointmentMoment[] = [];
  const { start, end, ...restFields } = appointment;
  let apptStart = start;
  let apptEnd = end;
  if (apptStart.isBefore(left)) apptStart = left.clone();
  if (apptEnd.isAfter(right)) apptEnd = right.clone();
  let pieceFrom = apptStart.clone();
  let pieceTo = apptStart.clone();
  let i = 0;
  while (pieceTo.isBefore(apptEnd)) {
    const currentRightBound = left.clone().add(step * i, 'days').subtract(1, 'second');
    if (currentRightBound.isAfter(apptStart)) {
      pieceTo = apptStart.clone().add(step * i, 'days');
      if (pieceTo.isAfter(currentRightBound)) {
        pieceTo = currentRightBound.clone();
      }
      if (pieceTo.isAfter(apptEnd)) {
        pieceTo = apptEnd.clone();
      }
      if (!pieceFrom.isSameOrAfter(pieceTo)) {
        pieces.push({ start: pieceFrom, end: pieceTo, ...restFields });
        pieceFrom = pieceTo.clone().add(1, 'second');
      }
    }
    i += 1;
  }
  return pieces;
};

export const getMonthCellIndexByDate: GetMonthCellIndexByDateFn = (
  viewCellsData, date, takePrev = false,
) => {
  const startViewDate = moment(viewCellsData[0][0].startDate);
  const currentDate = moment(date as SchedulerDateTime);
  let cellIndex = currentDate.diff(startViewDate, 'days');

  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    cellIndex -= 1;
  }

  return cellIndex;
};
