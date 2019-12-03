import {
  AllDayRects, VerticalRects, HorizontalRects,
} from '../../types';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
} from '../../constants';
import { calculateRectByDateIntervals } from '../../utils';
import { calculateWeekDateIntervals } from '../week-view/computeds';
import { getVerticalRectByAppointmentData } from '../vertical-rect/helpers';
import { getHorizontalRectByDates } from '../horizontal-rect/helpers';
import { calculateMonthDateIntervals } from '../month-view/computeds';
import { calculateAllDayDateIntervals } from '../all-day-panel/computeds';

export const allDayRects: AllDayRects = (
  appointments, startViewDate, endViewDate,
  excludedDays, viewCellsData, cellElementsMeta,
  grouping, resources, groupingItems,
) => {
  const intervals = calculateAllDayDateIntervals(
    appointments, startViewDate, endViewDate, excludedDays, grouping, resources, groupingItems,
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
    resources, groupingItems,
  );
};

export const verticalTimeTableRects: VerticalRects = (
  appointments, startViewDate, endViewDate, excludedDays,
  viewCellsData, cellDuration, cellElementsMeta, grouping, resources, groupingItems,
) => {
  const intervals = calculateWeekDateIntervals(
    appointments, startViewDate, endViewDate, excludedDays, cellDuration, grouping, resources,
  );

  return calculateRectByDateIntervals(
    {
      growDirection: VERTICAL_TYPE,
      multiline: false,
    },
    intervals,
    getVerticalRectByAppointmentData,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellDuration,
      cellElementsMeta,
    },
    resources, groupingItems,
  );
};

export const horizontalTimeTableRects: HorizontalRects = (
  appointments, startViewDate, endViewDate,
  viewCellsData, cellElementsMeta, grouping, resources, groupingItems,
) => {
  const intervals = calculateMonthDateIntervals(
    appointments, startViewDate, endViewDate, grouping, resources,
  );
  const result =  calculateRectByDateIntervals(
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
    resources, groupingItems,
  );
  return result;
};
