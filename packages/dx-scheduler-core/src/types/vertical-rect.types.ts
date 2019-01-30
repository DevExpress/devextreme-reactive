import { Index, CurrentTime, CellDuration, CellElement } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { ParentRect, Coordinates } from './horizontal-rect.types';

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
