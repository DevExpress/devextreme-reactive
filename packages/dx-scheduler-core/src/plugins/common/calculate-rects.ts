import {
  AllDayRects, VerticalRects, HorizontalRects,
} from '../../types';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
} from '../../constants';
import { calculateRectByDateAndGroupIntervals } from '../../utils';
import { calculateWeekDateAndGroupIntervals } from '../week-view/computeds';
import { getVerticalRectByAppointmentData } from '../vertical-rect/helpers';
import { getHorizontalRectByAppointmentData } from '../horizontal-rect/helpers';
import { calculateMonthDateAndGroupIntervals } from '../month-view/computeds';
import { calculateAllDayDateAndGroupIntervals } from '../all-day-panel/computeds';

export const allDayRects: AllDayRects = (
  appointments, startViewDate, endViewDate,
  excludedDays, viewCellsData, cellElementsMeta,
  grouping, resources, groupingItems,
) => {
  const intervals = calculateAllDayDateAndGroupIntervals(
    appointments, startViewDate, endViewDate, excludedDays, grouping, resources, groupingItems,
  );
  return calculateRectByDateAndGroupIntervals(
    {
      growDirection: HORIZONTAL_TYPE,
      multiline: false,
    },
    intervals,
    getHorizontalRectByAppointmentData,
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
  const intervals = calculateWeekDateAndGroupIntervals(
    appointments, startViewDate, endViewDate, excludedDays, cellDuration, grouping, resources,
  );

  return calculateRectByDateAndGroupIntervals(
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
  const intervals = calculateMonthDateAndGroupIntervals(
    appointments, startViewDate, endViewDate, grouping, resources,
  );
  const result =  calculateRectByDateAndGroupIntervals(
    {
      growDirection: HORIZONTAL_TYPE,
      multiline: true,
    },
    intervals,
    getHorizontalRectByAppointmentData,
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
