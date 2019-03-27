import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  ViewCell, AppointmentModel, ClientOffset, TimeType,
  AllDayCell, CalculateAppointmentTimeBoundaries,
} from '../../types';
import { allDayCells as allDayCellsCore } from '../common/computeds';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE, SCROLL_OFFSET, SCROLL_SPEED_PX, SECONDS,
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

export const calculateAppointmentTimeBoundaries: CalculateAppointmentTimeBoundaries = (
  payload, targetData, targetType,
  cellDurationMinutes, insidePart, offsetTimeTopBase,
) => {
  const appointmentDurationSeconds = intervalDuration(payload, SECONDS);
  const sourceType = payload.type;
  const insideOffset = targetType === VERTICAL_TYPE ? insidePart * cellDurationMinutes * 60 / 2 : 0;
  let offsetTimeTop;

  if (offsetTimeTopBase === null) {
    if (targetType === VERTICAL_TYPE) {
      offsetTimeTop = moment(targetData.startDate as Date)
        .diff(payload.startDate as Date, SECONDS) + insideOffset;
    } else {
      offsetTimeTop = moment(targetData.startDate as Date)
        .diff(payload.startDate as Date, 'days') * 24 * 60 * 60 + insideOffset;
    }
  } else {
    offsetTimeTop = offsetTimeTopBase;
  }

  const start = moment(targetData.startDate as Date).add(insideOffset, SECONDS);
  const end = moment(start);

  let appointmentStartTime;
  let appointmentEndTime;
  if (sourceType === VERTICAL_TYPE || sourceType === HORIZONTAL_TYPE) {
    if (sourceType === targetType) {
      appointmentStartTime = moment(start).add((offsetTimeTop) * (-1), SECONDS).toDate();
      appointmentEndTime = moment(end)
        .add((appointmentDurationSeconds - offsetTimeTop), SECONDS).toDate();
    } else {
      appointmentStartTime = moment(targetData.startDate as Date).add(insideOffset, SECONDS).toDate();
      appointmentEndTime = moment(targetData.endDate as Date).add(insideOffset, SECONDS).toDate();
    }
  }

  if (sourceType === 'resize-top') {
    if (targetType === payload.appointmentType) {
      appointmentStartTime = moment(targetData.startDate as Date).add(insideOffset, SECONDS).toDate();
    }
    appointmentEndTime = moment(payload.endDate as Date).toDate();
  }
  if (sourceType === 'resize-bottom') {
    if (targetType === payload.appointmentType) {
      const insideOffsetResize = insidePart === 0 ? cellDurationMinutes * 60 / 2 : 0;
      appointmentEndTime = moment(targetData.endDate as Date).add(-insideOffsetResize, SECONDS).toDate();
    }
    appointmentStartTime = moment(payload.startDate as Date).toDate();
  }
  // keep origin appointment duration if coordinates are wrong
  if (moment(appointmentEndTime).diff(appointmentStartTime, 'minutes') < 1) {
    appointmentStartTime = moment(payload.startDate as Date).toDate();
    appointmentEndTime = moment(payload.endDate as Date).toDate();
  }

  return {
    appointmentStartTime,
    appointmentEndTime,
    offsetTimeTop,
  };
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
  allDayIndex: number, timeTableIndex: number, draftAppointments: any, startViewDate: Date,
  endViewDate: Date, excludedDays: number[], viewCellsData: any, allDayCells: any,
  targetType: string, cellDurationMinutes: number, timeTableCells: any,
) => {
  let allDayDraftAppointments: any = [];
  let timeTableDraftAppointments: any = [];

  if (allDayIndex !== -1 || (allDayCells.length && intervalDuration(draftAppointments[0].dataItem, 'hours') > 23)) {
    allDayDraftAppointments = allDayRects(
      draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, allDayCells,
    );
  } else {
    allDayDraftAppointments = [];
  }

  if (timeTableIndex !== -1 || allDayIndex !== -1) {
    if (targetType === VERTICAL_TYPE || allDayIndex !== -1) {
      timeTableDraftAppointments = verticalTimeTableRects(
        draftAppointments, startViewDate, endViewDate,
        excludedDays, viewCellsData, cellDurationMinutes, timeTableCells,
      );
    } else {
      timeTableDraftAppointments = horizontalTimeTableRects(
        draftAppointments, startViewDate, endViewDate,
        viewCellsData, timeTableCells,
      );
    }
  } else {
    timeTableDraftAppointments = [];
  }

  return {
    allDayDraftAppointments,
    timeTableDraftAppointments,
  };
};
