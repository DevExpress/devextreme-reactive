import { FocusedElement } from '../index';

export interface FocusedCell {
  columnKey: string;
  rowKey: string;
}

export interface KeyboardNavigationProps {
  defaultFocusedCell?: FocusedCell;
  focusedCell?: FocusedCell;
  onFocusedCellChanged?: (cell: FocusedCell) => void;
}

/** @internal */
export type KeyboardNavigationState = {
  focusedElement?: FocusedElement;
};
