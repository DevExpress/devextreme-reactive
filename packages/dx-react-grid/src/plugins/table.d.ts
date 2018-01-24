import * as React from 'react';
import { Column } from '../grid';

export interface TableColumnExtension {
  /** The name of the column to extend. */
  columnName: string;
  /** The table column width in pixels. */
  width?: number;
  /** The table column alignment. */
  align?: 'left' | 'right';
}

export interface TableRow {
  /** A unique table row identifier. */
  key: string;
  /** Specifies the table row type. The specified value defines which cell template is used to render the row. */
  type: string;
  /** Specifies the associated row's ID. */
  rowId?: number | string;
  /** Specifies the associated row. */
  row?: any;
  /** Specifies the table row height. */
  height?: number;
}

export interface TableColumn {
  /** A unique table column identifier. */
  key: string;
  /** Specifies the table column type. The specified value defines which cell template is used to render the column. */
  type: string;
  /** Specifies the associated user column. */
  column?: Column;
  /** Specifies the table column width. */
  width?: number;
  /** Specifies the table's column alignment. */
  align?: 'left' | 'right';
}

export interface TableCellProps {
  /** Specifies a table row. */
  tableRow: TableRow;
  /** Specifies a table column. */
  tableColumn: TableColumn;
  /** Styles that should be applied to the root cell element. */
  style?: Object;
  /** The count of columns that the root cell element spans. */
  colSpan?: number;
}

export interface TableDataCellProps {
  /** Specifies a value to be rendered within the cell. */
  value: any;
  /** Specifies the cell's row. */
  row: any;
  /** Specifies the cell's column. */
  column: Column;
}

export interface TableNoDataCellProps {
  /** Returns the text displayed in a cell when a table is empty. */
  getMessage: (messageKey: string) => string;
}

export interface TableRowProps {
  /** A table row. */
  tableRow: TableRow;
  /** A React element used to render a table row. */
  children: React.ReactNode;
  /** Styles that should be applied to the root row element. */
  style?: Object;
}

export interface TableDataRowProps {
  /** A row. */
  row: any;
}

export interface TableProps {
  /** Additional column properties that the plugin can handle. */
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

export declare const Table: React.ComponentType<TableProps>;
