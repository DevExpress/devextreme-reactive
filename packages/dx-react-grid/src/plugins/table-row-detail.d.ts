import * as React from 'react';

export interface DetailContentProps {
  /** A row. */
  row: any;
}

export interface TableDetailCellProps {
  /** A row. */
  row: any;
  /** A detail cell's child React element. */
  children?: React.ReactNode;
}

export interface TableDetailRowProps {
  /** A row. */
  row: any;
}

export interface TableDetailToggleCellProps {
  /** A row. */
  row: any;
  /** Specifies whether to expand the detail row. */
  expanded: boolean;
  /** An event that initiates row expanding or collapsing. */
  onToggle: () => void;
}

export interface TableRowDetailProps {
  /** A component that renders the detail row's content within the detail cell. */
  contentComponent: React.ComponentType<DetailContentProps>;
  /** A component that renders a detail cell. */
  cellComponent: React.ComponentType<TableDetailCellProps>;
  /** A component that renders a detail row. */
  rowComponent: React.ComponentType<TableDetailRowProps>;
  /** A component that renders a cell containing the expand/collapse control. */
  toggleCellComponent: React.ComponentType<TableDetailToggleCellProps>;
  /** Specifies the width of the column containing expand/collapse controls. */
  toggleColumnWidth: number;
  /** Specifies the detail row height. */
  rowHeight: number;
}

export declare const TableRowDetail: React.ComponentType<TableRowDetailProps>;
