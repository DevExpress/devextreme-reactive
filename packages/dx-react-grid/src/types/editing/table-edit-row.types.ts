import { Column, Table } from '../index';

// tslint:disable-next-line: no-namespace
export namespace TableEditRow {
  /** Describes properties passed to a component that renders an editable cell. */
  export interface CellProps extends Table.CellProps {
    /** A row to be edited. */
    row: any;
    /** A column. */
    column: Column;
    /** A value to be edited. */
    value: any;
    /** Specifies whether editing a column is enabled. */
    editingEnabled: boolean;
    /** Handles value changes. */
    onValueChange: (newValue: any) => void;
  }

  /** Describes properties passed to a component that renders an editable row. */
  export interface RowProps extends Table.RowProps {
    /** A row to be edited. */
    row: any;
  }
}

export interface TableEditRowProps {
  /** A component that renders an editable cell. */
  cellComponent: React.ComponentType<TableEditRow.CellProps>;
  /** A component that renders an editable row. */
  rowComponent: React.ComponentType<TableEditRow.RowProps>;
  /** Specifies the editable row's height. */
  rowHeight?: number;
}
