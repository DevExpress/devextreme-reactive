import { Column, Table } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace TableTreeColumn {
  /** Describes properties passed to a component that renders a cell within a data row. */
  export interface CellProps extends Table.CellProps {
    /** Specifies a value to be rendered within the cell. */
    value: any;
    /** Specifies the cell's row. */
    row: any;
    /** Specifies the cell's column. */
    column: Column;
    /** A React node to be rendered within the cell. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a cell's content. */
  export interface ContentProps {
    /** A React node to be rendered within the cell's content. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders an indent used to identify a row level. */
  export interface IndentProps {
    /** Specifies the row level. */
    level: number;
  }

  /** Describes properties passed to a component that renders a button used to controls a row's expanded state. */
  export interface ExpandButtonProps {
    /** Specifies whether to show the button. */
    visible: boolean;
    /** Specifies whether a row is expanded. */
    expanded: boolean;
    /** An event that initiates row expanding or collapsing. */
    onToggle(): void;
  }

  /** Describes properties passed to a component that renders a checkbox used to control selection. */
  export interface CheckboxProps {
    /** Specifies whether a row is unavailable for selection. */
    disabled: boolean;
    /** Specifies whether a row is selected. */
    checked: boolean;
    /** Specifies whether a row's children are partially selected. */
    indeterminate: boolean;
    /** An event that initiates row selecting or deselecting. */
    onChange(): void;
  }
}

export interface TableTreeColumnProps {
  /** The name of a column that should be represented as a tree. */
  for: string;
  /** A component that renders a cell within a data row. */
  cellComponent: React.ComponentType<TableTreeColumn.CellProps>;
  /** A component that renders a cell's content. */
  contentComponent: React.ComponentType<TableTreeColumn.ContentProps>;
  /** A component that renders an indent used to identify a row level. */
  indentComponent: React.ComponentType<TableTreeColumn.IndentProps>;
  /** A component that renders a button that controls the row's expanded state. */
  expandButtonComponent: React.ComponentType<TableTreeColumn.ExpandButtonProps>;
  /** A component that renders a checkbox used to control selection. */
  checkboxComponent: React.ComponentType<TableTreeColumn.CheckboxProps>;
  /** Specifies whether to render selection controls. Requires the SelectionState plugin. */
  showSelectionControls?: boolean;
  /** Specifies whether to render Select All checkbox. Requires the IntegratedSelection plugin. */
  showSelectAll?: boolean;
}
/* tslint:enable no-namespace max-line-length */
