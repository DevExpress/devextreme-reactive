import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  ViewCell, AppointmentModel, ClientOffset, TimeType,
  AllDayRects, VerticalRects, HorizontalRects, AllDayCell,
  CalculateAppointmentTimeBoundaries,
} from '../../types';
import { allDayCells as allDayCellsCore } from '../common/computeds';
import { calculateRectByDateIntervals } from '../../utils';
import { calculateWeekDateIntervals } from '../week-view/computeds';
import { getVerticalRectByDates } from '../vertical-rect/helpers';
import { getHorizontalRectByDates } from '../horizontal-rect/helpers';
import { calculateMonthDateIntervals } from '../month-view/computeds';
import { calculateAllDayDateIntervals } from '../all-day-panel/computeds';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE, SCROLL_OFFSET, SCROLL_SPEED_PX, SECONDS,
} from '../../constants';

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

export const autoScroll = (clientOffset: any, layoutElement: any, layoutHeaderElement: any) => {
  const layout = layoutElement.current;
  const layoutHeaderRect = layoutHeaderElement.current.getBoundingClientRect();

  if ((clientOffset.y < layoutHeaderRect.height + layoutHeaderRect.top + SCROLL_OFFSET)
    && (clientOffset.y > layoutHeaderRect.height + layoutHeaderRect.top)) {
    layout.scrollTop -= SCROLL_SPEED_PX;
  }
  if (layout.clientHeight - SCROLL_OFFSET < clientOffset.y - layout.offsetTop) {
    layout.scrollTop += SCROLL_SPEED_PX;
  }
};

export const calculateAppointmentTimeBoundaries: CalculateAppointmentTimeBoundaries = (
  payload, targetData, targetType,
  cellDurationMinutes, insidePart, offsetTimeTopBase,
) => {
  const appointmentDurationSeconds = intervalDuration(payload, SECONDS);
  const sourceType = payload.type;
  const insideOffset = targetType === VERTICAL_TYPE ? insidePart * cellDurationMinutes * 60 / 2 : 0;
  let offsetTimeTop;

  if (offsetTimeTopBase === null) {
    offsetTimeTop = moment(targetData.startDate as Date)
      .diff(payload.startDate as Date, SECONDS) + insideOffset;
  } else {
    offsetTimeTop = offsetTimeTopBase;
  }

  const start = moment(targetData.startDate as Date).add(insideOffset, SECONDS);
  const end = moment(start);

  let appointmentStartTime;
  let appointmentEndTime;
  if (sourceType === targetType) {
    appointmentStartTime = moment(start).add((offsetTimeTop) * (-1), SECONDS).toDate();
    appointmentEndTime = moment(end)
      .add((appointmentDurationSeconds - offsetTimeTop), SECONDS).toDate();
  } else {
    appointmentStartTime = moment(targetData.startDate as Date).add(insideOffset, SECONDS).toDate();
    appointmentEndTime = moment(targetData.endDate as Date).add(insideOffset, SECONDS).toDate();
  }

  return {
    appointmentStartTime,
    appointmentEndTime,
    offsetTimeTop,
  };
};
