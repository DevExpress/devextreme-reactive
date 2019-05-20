import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentId, SchedulerTime, CellElement,
} from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { ParentRect, Coordinates } from './horizontal-rect.types';
import { EndDate } from './appointment-form.types';

/** @internal */
export type CellByDate = { index: AppointmentId; startDate: SchedulerTime };

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
  cellElements: CellElement[];
};
/** @internal */
export type GetCellByDateFn = PureComputed<
  [ViewCellData[][], SchedulerTime, boolean], CellByDate
>;
/** @internal */
export type GetCellRectVerticalFn = PureComputed<
  [SchedulerTime, ViewCellData[][], number, CellElement[], boolean], VerticalCellRect
>;
/** @internal */
export type GetVerticalRectByDatesFn = PureComputed<
  [SchedulerTime, EndDate, VerticalPayload], VerticalCellRectByDate
>;
