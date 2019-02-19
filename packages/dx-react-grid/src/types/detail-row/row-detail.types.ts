import { Table, RowId } from '../index';

export interface RowDetailStateProps {
  /** IDs of the rows being expanded. */
  expandedRowIds?: Array<number | string>;
  /** IDs of the rows initially expanded in the uncontrolled mode. */
  defaultExpandedRowIds?: Array<number | string>;
  /** Handles expanded rows changes. */
  onExpandedRowIdsChange?: (expandedRowIds: Array<number | string>) => void;
}

/** @internal */
export interface RowDetailStateState {
  expandedRowIds?: RowId[];
}

// tslint:disable-next-line: no-namespace
export namespace TableRowDetail {
  /** Describes properties passed to a component that renders a detail row's content. */
  export interface ContentProps {
    /** A row. */
    row: any;
  }

  /** Describes properties passed to a component that renders a detail cell. */
  export interface CellProps extends Table.CellProps {
    /** A row. */
    row: any;
    /** A detail cell's child React node. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a detail row. */
  export interface RowProps extends Table.RowProps {
    /** A row. */
    row: any;
  }

  // tslint:disable-next-line: max-line-length
  /** Describes properties passed to a component that renders a cell containing the expand/collapse control. */
  export interface ToggleCellProps extends Table.CellProps {
    /** A row. */
    row: any;
    /** Specifies whether to expand the detail row. */
    expanded: boolean;
    /** An event that initiates row expanding or collapsing. */
    onToggle(): void;
  }
}

export interface TableRowDetailProps {
  /** A component that renders the detail row's content within the detail cell. */
  contentComponent?: React.ComponentType<TableRowDetail.ContentProps>;
  /** A component that renders a detail cell. */
  cellComponent: React.ComponentType<TableRowDetail.CellProps>;
  /** A component that renders a detail row. */
  rowComponent: React.ComponentType<TableRowDetail.RowProps>;
  /** A component that renders a cell containing the expand/collapse control. */
  toggleCellComponent: React.ComponentType<TableRowDetail.ToggleCellProps>;
  /** Specifies the width of the column containing expand/collapse controls. */
  toggleColumnWidth: number;
  /** Specifies the detail row height. */
  rowHeight?: number;
}
