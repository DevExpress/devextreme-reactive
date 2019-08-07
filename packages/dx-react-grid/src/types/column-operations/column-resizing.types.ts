import { TableColumnWidthInfo } from '../index';

export interface TableColumnResizingProps {
  /** Specifies column widths. */
  columnWidths?: Array<TableColumnWidthInfo>;
  /** Specifies a column's minimum width. */
  minColumnWidth?: number;
  /** Specifies initial column widths in uncontrolled mode. */
  defaultColumnWidths?: Array<TableColumnWidthInfo>;
  /** Specifies initial column resize mode. */
  nextColumnResizing?: boolean;
  /** Handles column width changes. */
  onColumnWidthsChange?: (nextColumnWidths: Array<TableColumnWidthInfo>) => void;
}

/** @internal */
export type TableColumnResizingState = {
  columnWidths: TableColumnWidthInfo[],
  draftColumnWidths: TableColumnWidthInfo[],
  nextColumnResizing: boolean;
};

/** @internal */
export type CellWidthGetter = () => number;
