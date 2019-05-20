import { PureComputed } from '@devexpress/dx-core';
import { CellElement, SchedulerTime } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { EndDate } from './appointment-form.types';

export interface HorizontalPayload {
  multiline: boolean;
  viewCellsData: ViewCellData[][];
  cellElements: CellElement[][];
}

export interface Coordinates {
  top: number;
  left: number;
  width: number;
}

export interface Rect extends Coordinates {
  height: number;
}

export interface ParentRect extends Coordinates {
  height?: number;
}

export interface CellRect extends Rect {
  parentRect: ParentRect;
}

export interface HorizontalCellRect extends Rect {
  parentWidth: number;
}

export type GetCellRectHorizontalFn = PureComputed<
  [SchedulerTime, ViewCellData[][], CellElement[][], boolean, boolean], CellRect
>;

export type GetHorizontalRectByDatesFn = PureComputed<
  [SchedulerTime, EndDate, HorizontalPayload], HorizontalCellRect
>;
