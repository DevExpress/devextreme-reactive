import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  ViewCell, AppointmentModel, ClientOffset, TimeType,
  AllDayCell, CalculateAppointmentTimeBoundaries,
  TimeBoundariesByDrag, TimeBoundariesByResize,
} from '../../types';
import { allDayCells as allDayCellsCore } from '../common/computeds';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE, SCROLL_OFFSET, MINUTES,
  SCROLL_SPEED_PX, SECONDS, RESIZE_TOP, RESIZE_BOTTOM, HOURS,
} from '../../constants';
import { allDayRects, horizontalTimeTableRects, verticalTimeTableRects } from './calculate-rects';

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

export const autoScroll: PureComputed<
  [ClientOffset, any, any], void
> = (clientOffset, layoutElement, layoutHeaderElement) => {
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

export const timeBoundariesByResize: TimeBoundariesByResize = (
  payload, targetData, targetType, cellDurationMinutes, insidePart,
) => {
  if (targetType !== payload.appointmentType) {
    return { appointmentStartTime: undefined, appointmentEndTime: undefined };
  }

  let appointmentStartTime;
  let appointmentEndTime;
  const sourceType = payload.type;

  if (sourceType === RESIZE_TOP) {
    const insideTopOffset = targetType === VERTICAL_TYPE
      ? insidePart * cellDurationMinutes * 60 / 2 : 0;
    appointmentStartTime = moment(targetData.startDate as Date)
      .add(insideTopOffset, SECONDS).toDate();
    appointmentEndTime = new Date(payload.endDate as Date);
  }
  if (sourceType === RESIZE_BOTTOM) {
    const insideBottomOffset = insidePart === 0 && targetType === VERTICAL_TYPE
      ? cellDurationMinutes * 60 / 2 : 0;
    appointmentEndTime = moment(targetData.endDate as Date)
      .add(-insideBottomOffset, SECONDS).toDate();
    appointmentStartTime = new Date(payload.startDate as Date);
  }
  // keep origin appointment duration if coordinates are wrong
  if (moment(appointmentEndTime).diff(appointmentStartTime, MINUTES) < 1) {
    appointmentStartTime = new Date(payload.startDate as Date);
    appointmentEndTime = new Date(payload.endDate as Date);
  }
  return { appointmentStartTime, appointmentEndTime };
};

export const timeBoundariesByDrag: TimeBoundariesByDrag = (
  payload, targetData, targetType,
  cellDurationMinutes, insidePart, offsetTimeTopBase,
) => {
  let offsetTimeTop;
  let appointmentStartTime;
  let appointmentEndTime;

  const insideOffset = targetType === VERTICAL_TYPE ? insidePart * cellDurationMinutes * 60 / 2 : 0;
  const start = moment(targetData.startDate as Date).add(insideOffset, SECONDS);
  const end = moment(start);

  if (offsetTimeTopBase === null) {
    offsetTimeTop = moment(targetData.startDate as Date)
      .diff(payload.startDate as Date, SECONDS) + insideOffset;
  } else {
    offsetTimeTop = offsetTimeTopBase;
  }

  if (payload.type === targetType) {
    const appointmentDurationSeconds = intervalDuration(payload, SECONDS);
    appointmentStartTime = moment(start).add((offsetTimeTop) * (-1), SECONDS).toDate();
    appointmentEndTime = moment(end)
      .add((appointmentDurationSeconds - offsetTimeTop), SECONDS).toDate();
  } else {
    appointmentStartTime = moment(targetData.startDate as Date)
      .add(insideOffset, SECONDS).toDate();
    appointmentEndTime = moment(targetData.endDate as Date).add(insideOffset, SECONDS).toDate();
  }

  return { appointmentStartTime, appointmentEndTime, offsetTimeTop };
};

export const calculateAppointmentTimeBoundaries: CalculateAppointmentTimeBoundaries = (
  payload, targetData, targetType,
  cellDurationMinutes, insidePart, offsetTimeTopBase,
) => {
  const isDragging = (payload.type === VERTICAL_TYPE || payload.type === HORIZONTAL_TYPE);

  return(isDragging
    ? timeBoundariesByDrag(
        payload, targetData, targetType, cellDurationMinutes, insidePart, offsetTimeTopBase,
      )
    : timeBoundariesByResize(payload, targetData, targetType, cellDurationMinutes, insidePart)
  );
};

export const calculateInsidePart: PureComputed<
  [number, Element[], number]
> = (top, timeTableCells, timeTableIndex) => {
  if (timeTableIndex !== undefined && timeTableIndex !== -1) {
    const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
    return top > cellRect.top + cellRect.height / 2 ? 1 : 0;
  }
  return 0;
};

export const calculateDraftAppointments = (
  allDayIndex: number, draftAppointments: any, startViewDate: Date,
  endViewDate: Date, excludedDays: number[], viewCellsData: any, allDayCells: any,
  targetType: string, cellDurationMinutes: number, timeTableCells: any,
) => {
  if (allDayIndex !== -1
    || (allDayCells.length && intervalDuration(draftAppointments[0].dataItem, HOURS) > 23)) {
    return {
      allDayDraftAppointments: allDayRects(
        draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, allDayCells,
      ),
      timeTableDraftAppointments: [],
    };
  }

  if (targetType === VERTICAL_TYPE || allDayIndex !== -1) {
    return {
      allDayDraftAppointments: [],
      timeTableDraftAppointments: verticalTimeTableRects(
        draftAppointments, startViewDate, endViewDate,
        excludedDays, viewCellsData, cellDurationMinutes, timeTableCells,
      ),
    };
  }
  return {
    allDayDraftAppointments: [],
    timeTableDraftAppointments: horizontalTimeTableRects(
      draftAppointments, startViewDate, endViewDate,
      viewCellsData, timeTableCells,
    ),
  };
};
