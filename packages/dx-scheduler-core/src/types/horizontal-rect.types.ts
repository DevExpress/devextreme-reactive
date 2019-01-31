import { PureComputed } from '@devexpress/dx-core';
import { Multiline, CellElement, AppointmentDate } from './scheduler-core.types';
import { ViewCellData, TakePrevious } from './all-day-panel.types';
import { EndDate } from './appointment-form.types';

export interface HorizontalPayload {
  multiline: Multiline;
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
  [AppointmentDate, ViewCellData[][], CellElement[][], TakePrevious, Multiline], CellRect
>;

export type GetHorizontalRectByDatesFn = PureComputed<
  [AppointmentDate, EndDate, HorizontalPayload], HorizontalCellRect
>;
