import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  ViewCell, AppointmentModel, ClientOffset, TimeType,
  AllDayRects, VerticalRects, HorizontalRects, AllDayCell,
} from '../../types';
import { allDayCells as allDayCellsCore } from '../common/computeds';
import { calculateRectByDateIntervals } from '../../utils';
import { calculateWeekDateIntervals } from '../week-view/computeds';
import { getVerticalRectByDates } from '../vertical-rect/helpers';
import { getHorizontalRectByDates } from '../horizontal-rect/helpers';
import { calculateMonthDateIntervals } from '../month-view/computeds';
import { calculateAllDayDateIntervals } from '../all-day-panel/computeds';
import { VERTICAL_TYPE, HORIZONTAL_TYPE } from '../../constants';

const clamp: PureComputed<
  [number, number, number]
> = (value, min, max) => Math.max(Math.min(value, max), min);

export const cellType: PureComputed<
  [AppointmentModel], string
> = data => moment(data.startDate as Date)
  .isSame(data.endDate as Date, 'day') ? VERTICAL_TYPE : HORIZONTAL_TYPE;

export const intervalDuration: PureComputed<
  [AppointmentModel, TimeType], number
> = (data, type) => moment(data.endDate as Date).diff(data.startDate as Date, type);

export const cellIndex: PureComputed<
  [Element[], ClientOffset], number
> = (timeTableCells, clientOffset) => timeTableCells.findIndex((timeTableCell) => {
  const {
    left, top,
    right, bottom,
  } = timeTableCell.getBoundingClientRect();
  const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;
  return isOver;
});

export const cellData: PureComputed<
  [number, number, ViewCell[][]], ViewCell | AllDayCell
> = (timeTableIndex, allDayIndex, viewCellsData) => {
  if (allDayIndex !== -1) {
    const allDayCellsData = allDayCellsCore(viewCellsData);
    return allDayCellsData[allDayIndex];
  }
  const firstIndex = Math.floor(timeTableIndex / viewCellsData[0].length);
  const secondIndex = timeTableIndex % viewCellsData[0].length;
  return viewCellsData[firstIndex][secondIndex];
};

export const allDayRects: AllDayRects = (
  draftAppointments, startViewDate, endViewDate,
  excludedDays, viewCellsData, cellElements,
) => {
  const intervals = calculateAllDayDateIntervals(
    draftAppointments, startViewDate, endViewDate, excludedDays,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: HORIZONTAL_TYPE,
      multiline: false,
    },
    intervals,
    getHorizontalRectByDates,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellElements,
      excludedDays,
    },
  );
};

export const verticalTimeTableRects: VerticalRects = (
  draftAppointments, startViewDate, endViewDate, excludedDays,
  viewCellsData, cellDuration, cellElements,
) => {
  const intervals = calculateWeekDateIntervals(
    draftAppointments, startViewDate, endViewDate, excludedDays,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: VERTICAL_TYPE,
      multiline: false,
    },
    intervals,
    getVerticalRectByDates,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellDuration,
      cellElements,
    },
  );
};

export const horizontalTimeTableRects: HorizontalRects = (
  draftAppointments, startViewDate, endViewDate,
  excludedDays, viewCellsData, cellElements,
) => {
  const intervals = calculateMonthDateIntervals(
    draftAppointments, startViewDate, endViewDate,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: HORIZONTAL_TYPE,
      multiline: true,
    },
    intervals,
    getHorizontalRectByDates,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellElements,
    },
  );
};
