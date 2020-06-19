import moment from 'moment';
import { PureComputed } from '@devexpress/dx-core';
import {
  ViewCell, ClientOffset, TimeType, ScrollingStrategy,
  AllDayCell, CalculateAppointmentTimeBoundaries,
  TimeBoundariesByDrag, TimeBoundariesByResize, AppointmentModel,
  CellElementsMeta, Grouping, ValidResource, Group, SchedulerDateTime, GroupOrientation,
} from '../../types';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE, SCROLL_OFFSET, MINUTES,
  SECONDS, RESIZE_TOP, RESIZE_BOTTOM, HOURS,
} from '../../constants';
import {
  allDayRects, horizontalTimeTableRects, verticalTimeTableRects,
} from '../common/calculate-rects';

const clamp: PureComputed<
  [number, number, number]
> = (value, min, max) => Math.max(Math.min(value, max), min);

const calculateInsideOffset: PureComputed<
  [string, number, number], number
> = (targetType, insidePart, cellDurationMinutes) => targetType === VERTICAL_TYPE
  ? insidePart * cellDurationMinutes * 60 / 2 : 0;

export const cellType: PureComputed<
  [ViewCell | AllDayCell], string
> = data => moment(data.startDate as Date)
  .isSame(data.endDate as Date, 'day') ? VERTICAL_TYPE : HORIZONTAL_TYPE;

export const intervalDuration: PureComputed<
  [ViewCell | AllDayCell, TimeType], number
> = (data, type) => moment(data.endDate as Date).diff(data.startDate as Date, type);

export const cellIndex: PureComputed<
  [Array<() => ClientRect>, ClientOffset], number
> = (getCellRects, clientOffset) => getCellRects.findIndex((getCellRect) => {
  const { left, top, right, bottom } = getCellRect();
  const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;
  return isOver;
});

export const cellData: PureComputed<
  [number, number, ViewCell[][], ViewCell[][]], ViewCell | AllDayCell
> = (timeTableIndex, allDayIndex, viewCellsData, allDayCellsData) => {
  const cellsData = allDayIndex !== -1 ? allDayCellsData : viewCellsData;
  const currentIndex = allDayIndex !== -1 ? allDayIndex : timeTableIndex;
  const tableWidth = cellsData[0].length;

  const rowIndex = Math.floor(currentIndex / tableWidth);
  const columnIndex = currentIndex % tableWidth;
  return cellsData[rowIndex][columnIndex];
};

export const autoScroll: PureComputed<
  [ClientOffset, ScrollingStrategy, number], void
> = (clientOffset, scrollingStrategy, scrollSpeed) => {
  scroll(
    clientOffset.y, scrollingStrategy.topBoundary, scrollingStrategy.bottomBoundary,
    scrollingStrategy.changeVerticalScroll, scrollSpeed,
  );
  scroll(
    clientOffset.x, scrollingStrategy.leftBoundary, scrollingStrategy.rightBoundary,
    scrollingStrategy.changeHorizontalScroll, scrollSpeed,
  );
};

const scroll: PureComputed<
  [number, number, number, (value: number) => void, number], void
> = (offset, firstBoundary, secondBoundary, changeScroll, scrollSpeed) => {
  if ((offset < firstBoundary + SCROLL_OFFSET) && (offset > firstBoundary)) {
    changeScroll(-scrollSpeed);
  }
  if (secondBoundary - SCROLL_OFFSET < offset) {
    changeScroll(+scrollSpeed);
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
    const insideTopOffset = calculateInsideOffset(targetType, insidePart, cellDurationMinutes);
    appointmentStartTime = moment(targetData.startDate as Date)
      .add(insideTopOffset, SECONDS).toDate();
    appointmentEndTime = moment(payload.endDate as Date).toDate();
  }
  if (sourceType === RESIZE_BOTTOM) {
    const insideBottomOffset = insidePart === 0 && targetType === VERTICAL_TYPE
      ? cellDurationMinutes * 60 / 2 : 0;
    appointmentEndTime = moment(targetData.endDate as Date)
      .add(-insideBottomOffset, SECONDS).toDate();
    appointmentStartTime = moment(payload.startDate as Date).toDate();
  }
  // keep origin appointment duration if coordinates are wrong
  if (moment(appointmentEndTime).diff(appointmentStartTime, MINUTES) < 1) {
    appointmentStartTime = moment(payload.startDate as Date).toDate();
    appointmentEndTime = moment(payload.endDate as Date).toDate();
  }
  return { appointmentStartTime, appointmentEndTime };
};

export const timeBoundariesByDrag: TimeBoundariesByDrag = (
  payload, targetData, targetType,
  cellDurationMinutes, insidePart, offsetTimeTopBase,
) => {
  if (targetType === HORIZONTAL_TYPE
    && intervalDuration(payload, SECONDS) < intervalDuration(targetData, SECONDS)) {
    return {
      appointmentStartTime: targetData.startDate as Date,
      appointmentEndTime: targetData.endDate as Date,
      offsetTimeTop: 0,
    };
  }
  let offsetTimeTop;
  let appointmentStartTime;
  let appointmentEndTime;

  const insideOffset = calculateInsideOffset(targetType, insidePart, cellDurationMinutes);
  const start = moment(targetData.startDate as Date).add(insideOffset, SECONDS);

  if (offsetTimeTopBase === null) {
    offsetTimeTop = moment(targetData.startDate as Date)
      .diff(payload.startDate as Date, SECONDS) + insideOffset;
  } else {
    offsetTimeTop = offsetTimeTopBase;
  }

  if (payload.type === targetType) {
    const appointmentDurationSeconds = intervalDuration(payload, SECONDS);
    appointmentStartTime = moment(start).add((offsetTimeTop) * (-1), SECONDS).toDate();
    appointmentEndTime = moment(start)
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
        payload, targetData as AppointmentModel, targetType,
        cellDurationMinutes, insidePart, offsetTimeTopBase,
      )
    : timeBoundariesByResize(
        payload, targetData as AppointmentModel, targetType, cellDurationMinutes, insidePart,
      )
  );
};

export const calculateInsidePart: PureComputed<
  [number, Array<() => ClientRect>, number]
> = (top, timeTableCellsRects, timeTableIndex) => {
  if (timeTableIndex !== undefined && timeTableIndex !== -1) {
    const cellRect = timeTableCellsRects[timeTableIndex]();
    return top > cellRect.top + cellRect.height / 2 ? 1 : 0;
  }
  return 0;
};

export const calculateDraftAppointments = (
  allDayIndex: number, draftAppointments: any, startViewDate: Date,
  endViewDate: Date, excludedDays: number[], viewCellsData: any,
  getAllDayCellsElementRects: CellElementsMeta,
  targetType: string, cellDurationMinutes: number,
  getTableCellElementRects: CellElementsMeta,
  grouping: Grouping[], resources: ValidResource[], groups: Group[][],
  groupOrientation: GroupOrientation, groupedByDate: boolean,
) => {
  if (allDayIndex !== -1 || (targetType === VERTICAL_TYPE
    && getAllDayCellsElementRects.getCellRects.length
    && intervalDuration(draftAppointments[0].dataItem, HOURS) > 23)) {
    const allDayDrafts = draftAppointments.map((draftAppt: any) => ({
      ...draftAppt,
      allDay: true,
    }));

    return {
      allDayDraftAppointments: allDayRects(
        allDayDrafts, startViewDate, endViewDate,
        excludedDays, viewCellsData, getAllDayCellsElementRects,
        grouping, resources, groups, groupOrientation, groupedByDate,
      ),
      timeTableDraftAppointments: [],
    };
  }

  if (targetType === VERTICAL_TYPE || allDayIndex !== -1) {
    return {
      allDayDraftAppointments: [],
      timeTableDraftAppointments: verticalTimeTableRects(
        draftAppointments, startViewDate, endViewDate,
        excludedDays, viewCellsData, cellDurationMinutes, getTableCellElementRects,
        grouping, resources, groups, groupOrientation, groupedByDate,
      ),
    };
  }
  return {
    allDayDraftAppointments: [],
    timeTableDraftAppointments: horizontalTimeTableRects(
      draftAppointments, startViewDate, endViewDate,
      viewCellsData, getTableCellElementRects,
      grouping, resources, groups, groupOrientation, groupedByDate,
    ),
  };
};

export const calculateAppointmentGroups: PureComputed<
  [Array<Group> | undefined, Array<ValidResource>, AppointmentModel], any
> = (cellGroupingInfo, resources, appointmentData) => {
  if (!cellGroupingInfo) return {};
  return cellGroupingInfo.reduce((acc, group: Group) => {
    const isMultipleResource = resources.find(
      resource => (resource.fieldName === group.fieldName),
    )!.allowMultiple;
    return {
      ...acc,
      [group.fieldName]: isMultipleResource
        ? updateMultipleResourceInfo(group, appointmentData) : group.id,
    };
  }, {});
};

const updateMultipleResourceInfo: PureComputed<
  [Group, AppointmentModel], any
> = (cellResource, appointmentData) => {
  const appointmentGroupItems = appointmentData[cellResource.fieldName];
  if (appointmentGroupItems.findIndex((groupItem: any) => groupItem === cellResource.id) !== -1) {
    return appointmentGroupItems;
  }
  return [cellResource.id];
};

export const appointmentDragged: PureComputed<
  [SchedulerDateTime, SchedulerDateTime, SchedulerDateTime, SchedulerDateTime, any, any], boolean
> = (start, startPrev, end, endPrev, groupingInfo, groupingInfoPrev) => {
  if (moment(start as Date).isSame(startPrev as Date)
      && moment(end as Date).isSame(endPrev as Date)
      && groupingInfoNotChanged(groupingInfo, groupingInfoPrev)) {
    return false;
  }
  return true;
};

const groupingInfoNotChanged: PureComputed<
  [any, any], boolean
> = (groupingInfo, groupingInfoPrev) => {
  const fields = Object.getOwnPropertyNames(groupingInfo);
  return fields.every((field) => {
    if (Array.isArray(groupingInfo[field]) && Array.isArray(groupingInfoPrev[field])) {
      return groupingInfo[field].every((item: any, index: number) => (
        item === groupingInfoPrev[field][index]
      ));
    }
    return groupingInfo[field] === groupingInfoPrev[field];
  });
};
