import {
  AllDayRects, VerticalRects, HorizontalRects,
} from '../../types';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
} from '../../constants';
import { calculateRectByDateIntervals } from '../../utils';
import { calculateWeekDateIntervals } from '../week-view/computeds';
import { getVerticalRectByDates } from '../vertical-rect/helpers';
import { getHorizontalRectByDates } from '../horizontal-rect/helpers';
import { calculateMonthDateIntervals } from '../month-view/computeds';
import { calculateAllDayDateIntervals } from '../all-day-panel/computeds';

export const allDayRects: AllDayRects = (
  appointments, startViewDate, endViewDate,
  excludedDays, viewCellsData, cellElementsMeta,
) => {
  const intervals = calculateAllDayDateIntervals(
    appointments, startViewDate, endViewDate, excludedDays,
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
      cellElementsMeta,
      excludedDays,
    },
  );
};

export const verticalTimeTableRects: VerticalRects = (
  appointments, startViewDate, endViewDate, excludedDays,
  viewCellsData, cellDuration, cellElementsMeta,
) => {
  const intervals = calculateWeekDateIntervals(
    appointments, startViewDate, endViewDate, excludedDays,
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
      cellElementsMeta,
    },
  );
};

export const horizontalTimeTableRects: HorizontalRects = (
  appointments, startViewDate, endViewDate,
  viewCellsData, cellElementsMeta,
) => {
  const intervals = calculateMonthDateIntervals(
    appointments, startViewDate, endViewDate,
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
      cellElementsMeta,
    },
  );
};
