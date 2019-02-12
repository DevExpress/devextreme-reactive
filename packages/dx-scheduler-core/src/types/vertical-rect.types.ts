import { PureComputed } from '@devexpress/dx-core';
import {
  AppointmentId, CurrentTime, CellElement, AppointmentDate,
} from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { ParentRect, Coordinates } from './horizontal-rect.types';
import { EndDate } from './appointment-form.types';

export type CellByDate = { index: AppointmentId; startDate: CurrentTime };

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
  [ViewCellData[][], AppointmentDate, boolean], CellByDate
>;

export type GetCellRectVerticalFn = PureComputed<
  [AppointmentDate, ViewCellData[][], number, CellElement[], boolean], VerticalCellRect
>;

export type GetVerticalRectByDatesFn = PureComputed<
  [AppointmentDate, EndDate, VerticalPayload], VerticalCellRectByDate
>;
