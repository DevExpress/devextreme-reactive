import * as React from 'react';
import { Column } from '../grid';

export interface TableEditCellProps {
  /** A row to be edited. */
  row: any;
  /** A column. */
  column: Column;
  /** A value to be edited. */
  value: any;
  /** Handles value changes. */
  onValueChange: (newValue: any) => void;
}

export interface TableEditRowProps {
  /** A row to be edited. */
  row: any;
}

export interface TableEditRowProps {
  /** A component that renders an editable cell. */
  cellComponent: React.ComponentType<TableEditCellProps>;
  /** A component that renders an editable row. */
  rowComponent: React.ComponentType<TableEditRowProps>;
  /** Specifies the editable row's height. */
  rowHeight: number;
}

export declare const TableEditRow: React.ComponentType<TableEditRowProps>;
