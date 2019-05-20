import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentId, SchedulerTime, CellElement,
} from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { ParentRect, Coordinates } from './horizontal-rect.types';
import { EndDate } from './appointment-form.types';

export type CellByDate = { index: AppointmentId; startDate: SchedulerTime };

export interface VerticalCellRect extends Coordinates {
  topOffset: number;
  parentRect: ParentRect;
}

export interface VerticalCellRectByDate extends Coordinates {
  parentWidth: number;
  height: number;
}

export type VerticalPayload = {
  viewCellsData: ViewCellData[][];
  cellDuration: number;
  cellElements: CellElement[];
};

export type GetCellByDateFn = PureComputed<
  [ViewCellData[][], SchedulerTime, boolean], CellByDate
>;

export type GetCellRectVerticalFn = PureComputed<
  [SchedulerTime, ViewCellData[][], number, CellElement[], boolean], VerticalCellRect
>;

export type GetVerticalRectByDatesFn = PureComputed<
  [SchedulerTime, EndDate, VerticalPayload], VerticalCellRectByDate
>;
