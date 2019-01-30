import { Index, CurrentTime, CellDuration, CellElement } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';
import { ParentRect } from './horizontal-rect.types';

export type CellByDate = { index: Index; startDate: CurrentTime };

interface CellRect {
  width: number;
  top: number;
  left: number;
}

export interface VerticalCellRect extends CellRect {
  topOffset: number;
  parentRect: ParentRect;
}

export interface VerticalCellRectByDate extends CellRect {
  parentWidth: number;
  height: number;
}

export type VerticalPayload = {
  viewCellsData: ViewCellData[][];
  cellDuration: CellDuration;
  cellElements: CellElement[];
};
