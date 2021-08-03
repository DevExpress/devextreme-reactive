import {
  FocusedElement, Table, TableColumn, TableRow, RowId,
  FocusedCell, OnFocusedCellChangedFn,
} from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace KeyboardNavigation {
  /** Describes properties passed to a component that renders a keyboard navigation. */
  export interface CellProps extends Table.CellProps, Required<ExtraProps> {
    /** A component that should be rendered as a focused cell. */
    component: React.ComponentType<Table.CellProps>;
    /** @internal */
    tabIndex: number;
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
    setFocusedElement?: ({ key1, key2 }: { key1: string, key2: string }) => void;
  }
}

export interface KeyboardNavigationProps {
  defaultFocusedCell?: FocusedCell;
  focusedCell?: FocusedCell;
  onFocusedCellChanged?: OnFocusedCellChangedFn;
  cellComponent: React.ComponentType<KeyboardNavigation.CellProps>;
  rowComponent: React.ComponentType<KeyboardNavigation.RowProps>;
  focusedRowEnabled?: boolean;
}

export interface KeyboardNavigationCoreProps extends KeyboardNavigationProps {
  tableColumns: TableColumn[];
  tableBodyRows: TableRow[];
  tableHeaderRows: TableRow[];
  expandedRowIds: RowId[];
  rootRef: React.RefObject<HTMLTableElement>;
}

/** @internal */
export type KeyboardNavigationCoreState = {
  focusedElement?: FocusedElement;
};

// tslint:disable-next-line: no-empty-interface
export interface KeyboardNavigationComponent extends KeyboardNavigation.CellProps {
}
