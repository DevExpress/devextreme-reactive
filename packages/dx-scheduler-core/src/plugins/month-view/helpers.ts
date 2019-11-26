import moment from 'moment';
import {
  SliceAppointmentByWeekFn, GetMonthCellIndexByDateFn, SchedulerDateTime, AppointmentMoment,
} from '../../types';
import { DAYS_IN_WEEK } from '../appointment-form/constants';

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

export const getMonthCellIndex: GetMonthCellIndexByDateFn = (
  viewCellsData, date, appointment, takePrev = false,
) => {
  let cellIndex = -1;
  const startViewDate = moment(viewCellsData[0][0].startDate);
  const currentDate = moment(date as SchedulerDateTime);
  let dayNumber = currentDate.diff(startViewDate, 'days');
  if (takePrev && currentDate.format() === currentDate.startOf('day').format()) {
    dayNumber -= 1;
  }
  const weekNumber = Math.floor(dayNumber / DAYS_IN_WEEK);
  let dayOfWeek = dayNumber % DAYS_IN_WEEK;

  while (cellIndex === -1) {
    let flag = true;
    if (viewCellsData[weekNumber][dayOfWeek].groupingInfo) {
      viewCellsData[weekNumber][dayOfWeek].groupingInfo.map((groupingItem) => {
        flag = flag && groupingItem.id === appointment[groupingItem.fieldName];
      });
    }
    if (flag) {
      cellIndex = dayOfWeek;
    }
    dayOfWeek += DAYS_IN_WEEK;
  }

  const totalCellIndex = weekNumber * viewCellsData[0].length + cellIndex;
  return totalCellIndex;
};
