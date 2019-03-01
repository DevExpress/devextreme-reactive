import { ViewCell, Appointment } from '../../types';
import { allDayCells as allDayCellsCore } from '../common/computeds';
import { calculateRectByDateIntervals } from '../../utils';
import { calculateWeekDateIntervals } from '../week-view/computeds';
import { getVerticalRectByDates } from '../vertical-rect/helpers';
import { getHorizontalRectByDates } from '../horizontal-rect/helpers';
import { calculateMonthDateIntervals } from '../month-view/computeds';
import { calculateAllDayDateIntervals } from '../all-day-panel/computeds';

const clamp = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min);

type clientOffset = {
  x: number;
  y: number;
};

export const cellIndex = (
  timeTableCells: Element[], clientOffset: clientOffset,
) => timeTableCells.findIndex((timeTableCell) => {
  const {
    left, top,
    right, bottom,
  } = timeTableCell.getBoundingClientRect();
  const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;
  return isOver;
});

export const cellData = (
  timeTableIndex: number, allDayIndex: number, viewCellsData: ViewCell[][],
) => {
  if (allDayIndex !== -1) {
    const allDayCellsData = allDayCellsCore(viewCellsData);
    return allDayCellsData[allDayIndex];
  }
  // timeTableIndex !== -1
  const firstIndex = Math.floor(timeTableIndex / viewCellsData[0].length);
  const secondIndex = timeTableIndex % viewCellsData[0].length;
  return viewCellsData[firstIndex][secondIndex];
};

export const allDayRects = (
  draftAppointments: Appointment[], startViewDate: Date, endViewDate: Date,
  excludedDays: number[], viewCellsData: ViewCell[][], cellElements: Element[][],
) => {
  const intervals = calculateAllDayDateIntervals(
    draftAppointments, startViewDate, endViewDate, excludedDays,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: 'horizontal',
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

export const verticalTimeTableRects = (
  draftAppointments: Appointment[], startViewDate: Date, endViewDate: Date, excludedDays: number[],
  viewCellsData: ViewCell[][], cellDuration: number, cellElements: Element[][],
) => {
  const intervals = calculateWeekDateIntervals(
    draftAppointments, startViewDate, endViewDate, excludedDays,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: 'vertical',
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

export const horizontalTimeTableRects = (
  draftAppointments: Appointment[], startViewDate: Date, endViewDate: Date,
  excludedDays: number[], viewCellsData: ViewCell[][], cellElements: Element[][],
) => {
  const intervals = calculateMonthDateIntervals(
    draftAppointments, startViewDate, endViewDate,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: 'horizontal',
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
