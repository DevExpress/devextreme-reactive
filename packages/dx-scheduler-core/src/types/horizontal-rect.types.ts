import { Multiline, CellElement } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';

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
