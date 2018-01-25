import * as React from 'react';
import {
  ColumnWidthInfo,
} from '@devexpress/dx-react-grid';

export interface TableColumnResizingProps {
  /** Specifies column widths. */
  columnWidths?: Array<ColumnWidthInfo>;
  /** Specifies initial column widths in uncontrolled mode. */
  defaultColumnWidths?: Array<ColumnWidthInfo>;
  /** Handles column width changes. */
  onColumnWidthsChange?: (nextColumnWidths: { [columnName: string]: number }) => void;
}

export declare const TableColumnResizing: React.ComponentType<TableColumnResizingProps>;
