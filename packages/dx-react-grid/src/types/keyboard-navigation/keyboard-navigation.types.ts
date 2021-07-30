import { FocusedElement, Table } from '../index';

export interface FocusedCell {
  columnKey: string;
  rowKey: string;
}

export interface KeyboardNavigationProps {
  defaultFocusedCell?: FocusedCell;
  focusedCell?: FocusedCell;
  onFocusedCellChanged?: (cell: FocusedCell) => void;
  cellComponent: React.ComponentType<Table.DataCellProps>;
}

/** @internal */
export type KeyboardNavigationState = {
  focusedElement?: FocusedElement;
};

export interface KeyboardNavigationComponent extends Table.CellProps {
  /** @internal */
  updateRefForKeyboardNavigation: ({ ref, key1, key2, action }:
    { ref: any, key1: string, key2: string, action: string }) => void;
  /** @internal */
  setFocusedElement: ({ key1, key2 }: { key1: string, key2: string }) => void;
}
