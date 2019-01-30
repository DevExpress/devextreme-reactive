import { Multiline, CellElement } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';

export interface HorizontalPayload {
  multiline: Multiline;
  viewCellsData: ViewCellData[][];
  cellElements: CellElement[][];
}

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type ParentRect = {
  top: number;
  left: number;
  width: number;
  height?: number;
};

export interface CellRect extends Rect {
  parentRect: ParentRect;
}

export interface HorizontalCellRect extends Rect {
  parentWidth: number;
}
