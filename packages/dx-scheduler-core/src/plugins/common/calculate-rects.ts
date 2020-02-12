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
  grouping, resources, groups, groupOrientation, sliceAppointments,
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
    {
      groupOrientation,
      groupedByDate: sliceAppointments,
      groupCount: groups ? groups[groups.length - 1].length : 1,
    },
  );
};

export const verticalTimeTableRects: VerticalRects = (
  appointments, startViewDate, endViewDate, excludedDays, viewCellsData,
  cellDuration, cellElementsMeta, grouping, resources, groups,  groupOrientation, groupByDate,
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
    {
      groupOrientation,
      groupedByDate: groupByDate,
      groupCount: groups ? groups[groups.length - 1].length : 1,
    },
  );
};

export const horizontalTimeTableRects: HorizontalRects = (
  appointments, startViewDate, endViewDate, viewCellsData,
  cellElementsMeta, grouping, resources, groups, groupOrientation, sliceAppointments,
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
    {
      groupOrientation,
      groupedByDate: sliceAppointments,
      groupCount: groups ? groups[groups.length - 1].length : 1,
    },
  );
};
