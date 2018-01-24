import * as React from 'react';
import {
  TableColumnExtension,
  TableDataCellProps,
  TableDataRowProps,
  TableNoDataCellProps,
  TableRowProps,
  TableCellProps,
} from './table';

export interface VirtualTableProps {
  /** The virtual table's height. */
  height: number;
  /** Estimated row height. Specify the average value for a table whose rows have different heights. */
  estimatedRowHeight: number;
  /** undefined */
  columnExtensions: Array<TableColumnExtension>;
  /** A component that renders a table cell. */
  cellComponent: React.ComponentType<TableDataCellProps>;
  /** A component that renders a table row. */
  rowComponent: React.ComponentType<TableDataRowProps>;
  /** A component that renders a table cell when the table is empty. */
  noDataCellComponent: React.ComponentType<TableNoDataCellProps>;
  /** A component that renders a table row when the table is empty. */
  noDataRowComponent: React.ComponentType<TableRowProps>;
  /** A component that renders a stub table cell if the cell value is not provided. */
  stubCellComponent: React.ComponentType<TableCellProps>;
  /** A component that renders a stub header cell if the cell value is not provided. */
  stubHeaderCellComponent: React.ComponentType<TableCellProps>;
  /** An object that specifies the [localization messages]. */
  messages: object;
}

export declare const VirtualTable: React.ComponentType<VirtualTableProps>;
