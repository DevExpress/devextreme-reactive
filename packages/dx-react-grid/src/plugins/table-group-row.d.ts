import * as React from 'react';
import { Column } from '../grid';

export interface TableGroupColumnExtension {
  /** The name of a column to extend. */
  columnName: string;
  /** Specifies whether the grid displays the column by which data is grouped. */
  showWhenGrouped?: boolean;
}

export interface TableGroupCellProps {
  /** The group row. */
  row: GroupRow;
  /** The column associated with the group. */
  column: Column;
  /** Specifies whether the row is expanded. */
  expanded: boolean;
  /** An event that initiates group row's expanding or collapsing. */
  onToggle: () => void;
}

export interface TableGroupRowProps {
  /** The group row. */
  row: GroupRow;
}

export interface TableGroupIndentCellProps {
  /** The group row. */
  row: GroupRow;
  /** A column associated with the group. */
  column: Column;
}

export interface GroupRow {
  /** The current group key. */
  key: number | string;
  /** The current group value. */
  value: any;
}

export interface TableGroupRowProps {
  /** A Boolean value that specifies whether the grid's table displays a column by which data is grouped. */
  showColumnsWhenGrouped: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions: Array<TableGroupColumnExtension>;
  /** A component that renders a group cell. */
  cellComponent: React.ComponentType<TableGroupCellProps>;
  /** A component that renders a group row. */
  rowComponent: React.ComponentType<TableGroupRowProps>;
  /** A component that renders a group indent cell. */
  indentCellComponent: React.ComponentType<TableGroupIndentCellProps>;
  /** The group indent column's width. */
  indentColumnWidth: number;
}

export declare const TableGroupRow: React.ComponentType<TableGroupRowProps>;
