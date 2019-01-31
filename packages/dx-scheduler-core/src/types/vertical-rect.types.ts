import { PureComputed } from '@devexpress/dx-core';
import {
  Index, CurrentTime, CellDuration, CellElement, AppointmentDate,
} from './scheduler-core.types';
import { ViewCellData, TakePrevious } from './all-day-panel.types';
import { ParentRect, Coordinates } from './horizontal-rect.types';
import { EndDate } from './appointment-form.types';

export type CellByDate = { index: Index; startDate: CurrentTime };

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
  cellDuration: CellDuration;
  cellElements: CellElement[];
};

export type GetCellByDateFn = PureComputed<
  [ViewCellData[][], AppointmentDate, TakePrevious], CellByDate
>;

export type GetCellRectVerticalFn = PureComputed<
  [AppointmentDate, ViewCellData[][], CellDuration, CellElement[], TakePrevious], VerticalCellRect
>;

export type GetVerticalRectByDatesFn = PureComputed<
  [AppointmentDate, EndDate, VerticalPayload], VerticalCellRectByDate
>;
