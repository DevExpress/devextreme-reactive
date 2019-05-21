import { PureComputed } from '@devexpress/dx-core';
import { CellElement, SchedulerDateTime } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { EndDate } from './appointment-form.types';

/** @internal */
export interface HorizontalPayload {
  multiline: boolean;
  viewCellsData: ViewCellData[][];
  cellElements: CellElement[][];
}

/** @internal */
export interface Coordinates {
  top: number;
  left: number;
  width: number;
}

/** @internal */
export interface Rect extends Coordinates {
  height: number;
}

/** @internal */
export interface ParentRect extends Coordinates {
  height?: number;
}

/** @internal */
export interface CellRect extends Rect {
  parentRect: ParentRect;
}

/** @internal */
export interface HorizontalCellRect extends Rect {
  parentWidth: number;
}

/** @internal */
export type GetCellRectHorizontalFn = PureComputed<
  [SchedulerDateTime, ViewCellData[][], CellElement[][], boolean, boolean], CellRect
>;

/** @internal */
export type GetHorizontalRectByDatesFn = PureComputed<
  [SchedulerDateTime, EndDate, HorizontalPayload], HorizontalCellRect
>;
