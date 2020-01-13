import {
  AllDayRects, VerticalRects, HorizontalRects,
} from '../../types';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
} from '../../constants';
import { calculateRectByDateAndGroupIntervals } from '../../utils';
import { calculateWeekDateIntervals } from '../week-view/computeds';
import { getVerticalRectByAppointmentData } from '../vertical-rect/helpers';
import { getHorizontalRectByAppointmentData } from '../horizontal-rect/helpers';
import { calculateMonthDateIntervals } from '../month-view/computeds';
import { calculateAllDayDateIntervals } from '../all-day-panel/computeds';
import { expandGroups } from '../integrated-grouping/computeds';

export const allDayRects: AllDayRects = (
  appointments, startViewDate, endViewDate,
  excludedDays, viewCellsData, cellElementsMeta,
  grouping, resources, groups, sliceAppointments,
) => {
  const intervals = calculateAllDayDateIntervals(
    appointments, startViewDate, endViewDate, excludedDays,
  );
  const groupedIntervals = expandGroups(
    intervals, grouping, resources, groups, excludedDays, sliceAppointments,
  );

  return calculateRectByDateAndGroupIntervals(
    {
      growDirection: HORIZONTAL_TYPE,
      multiline: false,
    },
    groupedIntervals,
    getHorizontalRectByAppointmentData,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellElementsMeta,
      excludedDays,
    },
    sliceAppointments,
  );
};

export const verticalTimeTableRects: VerticalRects = (
  appointments, startViewDate, endViewDate, excludedDays, viewCellsData,
  cellDuration, cellElementsMeta, grouping, resources, groups, groupByDate,
) => {
  const intervals = calculateWeekDateIntervals(
    appointments, startViewDate, endViewDate, excludedDays, cellDuration,
  );
  const groupedIntervals = expandGroups(
    intervals, grouping, resources, groups, excludedDays, false,
  );

  return calculateRectByDateAndGroupIntervals(
    {
      growDirection: VERTICAL_TYPE,
      multiline: false,
    },
    groupedIntervals,
    getVerticalRectByAppointmentData,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellDuration,
      cellElementsMeta,
    },
    groupByDate,
  );
};

export const horizontalTimeTableRects: HorizontalRects = (
  appointments, startViewDate, endViewDate, viewCellsData,
  cellElementsMeta, grouping, resources, groups, sliceAppointments,
) => {
  const intervals = calculateMonthDateIntervals(
    appointments, startViewDate, endViewDate,
  );
  const groupedIntervals = expandGroups(
    intervals, grouping, resources, groups, [], sliceAppointments,
  );

  return calculateRectByDateAndGroupIntervals(
    {
      growDirection: HORIZONTAL_TYPE,
      multiline: true,
    },
    groupedIntervals,
    getHorizontalRectByAppointmentData,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellElementsMeta,
    },
    sliceAppointments,
  );
};
