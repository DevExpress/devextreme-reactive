import { PureComputed } from '@devexpress/dx-core';
import { SchedulerDateTime, CellElementsMeta } from './scheduler-core.types';
import { ViewCellData, AppointmentMoment } from './all-day-panel.types';
import { ViewMetaData } from './utils.types';

/** @internal */
export interface HorizontalPayload {
  multiline: boolean;
  viewCellsData: ViewCellData[][];
  cellElementsMeta: CellElementsMeta;
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
  [SchedulerDateTime, AppointmentMoment, ViewCellData[][],
  ViewMetaData, CellElementsMeta, boolean, boolean], CellRect
>;

/** @internal */
export type GetHorizontalRectByAppointmentDataFn = PureComputed<
  [AppointmentMoment, ViewMetaData, HorizontalPayload], HorizontalCellRect
>;
