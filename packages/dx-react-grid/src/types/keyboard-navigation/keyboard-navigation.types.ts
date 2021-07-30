import { FocusedElement, Table } from '../index';

export interface FocusedCell {
  columnKey: string;
  rowKey: string;
}
/* tslint:disable no-namespace max-line-length */
export namespace KeyboardNavigation {
  /** Describes properties passed to a component that renders a keyboard navigation. */
  export interface CellProps extends Table.CellProps {
    /** A component that should be rendered as a focused cell. */
    component: React.ComponentType<Table.CellProps>;
    /** @internal */
    tabIndex: number;
    /** @internal */
    updateRefForKeyboardNavigation: ({ ref, key1, key2, action }:
    { ref: any, key1: string, key2: string, action: string }) => void;
    /** @internal */
    setFocusedElement: ({ key1, key2 }: { key1: string, key2: string }) => void;
  }
  export interface RowProps extends Table.RowProps {
    /** A component that should be rendered as a focused cell. */
    component: React.ComponentType<Table.RowProps>;
    /** @internal */
    focused: boolean;
  }
}

export interface KeyboardNavigationProps {
  defaultFocusedCell?: FocusedCell;
  focusedCell?: FocusedCell;
  onFocusedCellChanged?: (cell: FocusedCell) => void;
  cellComponent: React.ComponentType<KeyboardNavigation.CellProps>;
  rowComponent: React.ComponentType<KeyboardNavigation.RowProps>;
  focusedRowEnabled?: boolean;
}

/** @internal */
export type KeyboardNavigationState = {
  focusedElement?: FocusedElement;
};

// tslint:disable-next-line: no-empty-interface
export interface KeyboardNavigationComponent extends KeyboardNavigation.CellProps {
}
