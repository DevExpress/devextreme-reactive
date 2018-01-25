import * as React from 'react';
import { Column } from '../grid';

export namespace TableEditRow {
  export interface RowProps {
    /** A row to be edited. */
    row: any;
  }

  export interface CellProps {
    /** A row to be edited. */
    row: any;
    /** A column. */
    column: Column;
    /** A value to be edited. */
    value: any;
    /** Handles value changes. */
    onValueChange: (newValue: any) => void;
  }
}

export interface TableEditRowProps {
  /** A component that renders an editable cell. */
  cellComponent: React.ComponentType<TableEditRow.CellProps>;
  /** A component that renders an editable row. */
  rowComponent: React.ComponentType<TableEditRow.RowProps>;
  /** Specifies the editable row's height. */
  rowHeight: number;
}

export declare const TableEditRow: React.ComponentType<TableEditRowProps>;
