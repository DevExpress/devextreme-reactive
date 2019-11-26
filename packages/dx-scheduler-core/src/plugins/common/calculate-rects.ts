import {
  AllDayRects, VerticalRects, HorizontalRects, AppointmentMoment, Grouping, Resource,
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
import { PureComputed } from '@devexpress/dx-core/src';

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
    appointments, startViewDate, endViewDate, excludedDays, cellDuration,
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
  viewCellsData, cellElementsMeta, grouping, resources,
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
  );
  return result;
};

export const expandGroupedAppointments: PureComputed<
  [AppointmentMoment[], Grouping[], Resource[]], AppointmentMoment[]
> = (appointments, grouping, resources) => {
  return appointments.reduce((acc: AppointmentMoment[], appointment: AppointmentMoment) => {
    const result = resources.reduce((acc: AppointmentMoment[], resource: Resource) => {

      const isGroupedByResource = grouping.find(
        groupingItem => groupingItem.resourceName === resource.fieldName,
      ) !== undefined;
      if (!isGroupedByResource) return acc;
      const resourceField = resource.fieldName;
      if (!resource.allowMultiple) {
        return acc.reduce((accumulator, currentAppointment) => {
          return [...accumulator, { ...currentAppointment, [resourceField]: currentAppointment.dataItem[resourceField] }]
        }, [] as AppointmentMoment[]);
      }
      return acc.reduce((accumulator, currentAppointment) => {
        return [...accumulator, ...currentAppointment.dataItem[resourceField].map((resourceValue) => {
          return { ...currentAppointment, [resourceField]: resourceValue };
        })];
      }, []);
    }, [appointment] as AppointmentMoment[]);
    return [...acc, ...result];
  }, [] as AppointmentMoment[]);
};
