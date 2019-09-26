import { Column, Table } from '../index';

// tslint:disable-next-line: no-namespace
export namespace TableInlineCellEditing {
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
    /** AutoFocus on element */
    autoFocus: boolean;
    /** A function called on focus an element */
    onFocus: (e: any) => void;
    /** A function called on key down */
    onKeyDown: (e: any) => void;
    /** A function called on focus lost */
    onBlur: () => void;
  }
}

export interface TableInlineCellEditingProps {
  /** A component that renders an editable cell. */
  cellComponent: React.ComponentType<TableInlineCellEditing.CellProps>;
  /** Define text selection on edit start */
  selectTextOnEditStart: boolean;
  /** An action, that start editing cell */
  startEditAction: 'click' | 'doubleClick';
}
