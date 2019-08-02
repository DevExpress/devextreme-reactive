import { TableColumnWidthInfo } from '../index';
// tslint:disable-next-line:no-namespace
export namespace TableColumnResizing {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** A column name. */
    columnName: string;
    /** A column minimum width. */
    minWidth?: number;
    /** A column maximum width. */
    maxWidth?: number;
  }
}
export interface TableColumnResizingProps {
  /** Specifies column widths. */
  columnWidths?: Array<TableColumnWidthInfo>;
  /** Specifies a column's minimum width. */
  minColumnWidth?: number;
  /** Specifies a column's maximum width. */
  maxColumnWidth?: number;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<TableColumnResizing.ColumnExtension>;
  /** Specifies initial column widths in uncontrolled mode. */
  defaultColumnWidths?: Array<TableColumnWidthInfo>;
  /** Handles column width changes. */
  onColumnWidthsChange?: (nextColumnWidths: Array<TableColumnWidthInfo>) => void;
}

/** @internal */
export type TableColumnResizingState = {
  columnWidths: TableColumnWidthInfo[],
  draftColumnWidths: TableColumnWidthInfo[],
};
