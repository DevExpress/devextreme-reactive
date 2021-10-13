import {
  FocusedElement, Table, TableColumn, TableRow, RowId,
  FocusedCell, OnFocusedCellChangeFn, ScrollToColumnFn,
} from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace TableKeyboardNavigation {
  /** Describes properties passed to a component that renders a keyboard navigation. */
  export interface CellProps extends Table.CellProps, Required<ExtraProps> {
    /** A component that should be rendered as a focused cell. */
    component: React.ComponentType<Table.CellProps>;
    /** @internal */
    tabIndex: number;
    /** @internal */
    focused: boolean;
  }
  export interface RowProps extends Table.RowProps {
    /** A component that should be rendered as a focused cell. */
    component: React.ComponentType<Table.RowProps>;
    /** @internal */
    focused: boolean;
  }

  export interface ExtraProps {
    /** @internal */
    updateRefForKeyboardNavigation?: ({ ref, key1, key2, action }:
      { ref: any, key1: string, key2: string, action: string }) => void;
    /** @internal */
    setFocusedElement?: ({ key1, key2, event }: { key1: string, key2: string, event: any }) => void;
  }
}

export interface TableKeyboardNavigationProps {
  /** Specifies initially focused cell in the uncontrolled mode. */
  defaultFocusedCell?: FocusedCell;
  /** Specifies focused cell. */
  focusedCell?: FocusedCell;
  /** Handles focused cell changes. */
  onFocusedCellChange?: OnFocusedCellChangeFn;
  /** A component that renders the cell element. */
  cellComponent: React.ComponentType<TableKeyboardNavigation.CellProps>;
  /** A component that renders the row element. */
  rowComponent: React.ComponentType<TableKeyboardNavigation.RowProps>;
  /** Applies a focused style to the row that contains the focused cell. */
  focusedRowEnabled?: boolean;
}

/** @internal */
export interface TableKeyboardNavigationCoreProps extends TableKeyboardNavigationProps {
  tableColumns: TableColumn[];
  tableBodyRows: TableRow[];
  tableHeaderRows: TableRow[];
  expandedRowIds: RowId[];
  rootRef: React.RefObject<HTMLTableElement>;
  scrollToColumn: ScrollToColumnFn;
}

/** @internal */
export type TableKeyboardNavigationCoreState = {
  focusedElement?: FocusedElement;
};

// tslint:disable-next-line: no-empty-interface
export interface KeyboardNavigationComponent extends TableKeyboardNavigation.CellProps {
}
