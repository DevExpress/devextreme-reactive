import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentId, SchedulerDateTime, CellElementsMeta,
} from './scheduler-core.types';
import { ViewCellData, AppointmentMoment } from './all-day-panel.types';
import { ParentRect, Coordinates } from './horizontal-rect.types';
import { GroupOrientation } from './grouping-state.types';

/** @internal */
export type CellByDate = { index: AppointmentId; startDate: SchedulerDateTime };

/** @internal */
export interface VerticalCellRect extends Coordinates {
  topOffset: number;
  parentRect: ParentRect;
}

/** @internal */
export interface VerticalCellRectByDate extends Coordinates {
  parentWidth: number;
  height: number;
}

/** @internal */
export type VerticalPayload = {
  viewCellsData: ViewCellData[][];
  cellDuration: number;
  cellElementsMeta: CellElementsMeta;
};
/** @internal */
export type GetCellByAppointmentDataFn = PureComputed<
  [AppointmentMoment, ViewCellData[][], GroupOrientation,
  number, SchedulerDateTime, boolean], CellByDate
>;
/** @internal */
export type GetCellRectVerticalFn = PureComputed<
  [SchedulerDateTime, AppointmentMoment, ViewCellData[][],
  number, CellElementsMeta, boolean, GroupOrientation, number], VerticalCellRect
>;
/** @internal */
export type GetVerticalRectByAppointmentDataFn = PureComputed<
  [AppointmentMoment, GroupOrientation, number, VerticalPayload], VerticalCellRectByDate
>;
