import * as React from 'react';

export interface TableSelectHeaderCellProps {
  /** Indicates if there are no rows that can be selected. */
  disabled: boolean;
  /** Indicates whether all the rows available for selection are selected. */
  allSelected: boolean;
  /** Indicates whether at least one but not all rows available for selection are selected. */
  someSelected: boolean;
  /** Toggles the "Select All" checkbox state. */
  onToggle: (select?: boolean) => void;
}

export interface TableSelectCellProps {
  /** A row. */
  row: any;
  /** Indicates whether a row is selected. */
  selected: boolean;
  /** An event that initiates row selecting or deselecting. */
  onToggle: () => void;
}

export interface TableSelectionProps {
  /** Specifies whether to highlight the selected rows. Note that `Table` plugin's `rowComponent` is ignored in this case. */
  highlightRow: boolean;
  /** Specifies whether a user can select/deselect a row by clicking it. Note that `Table` plugin's `rowComponent` is ignored in this case. */
  selectByRowClick: boolean;
  /** Specifies whether to render the 'select all' checkbox in the header row. */
  showSelectAll: boolean;
  /** Specifies whether to render the selection column that displays selection checkboxes. */
  showSelectionColumn: boolean;
  /** A component that renders a selection cell (a cell containing a selection checkbox). */
  cellComponent: React.ComponentType<TableSelectCellProps>;
  /** A component that renders a cell containing the 'Select All' checkbox. */
  headerCellComponent: React.ComponentType<TableSelectHeaderCellProps>;
  /** The selection column's width. */
  selectionColumnWidth: number;
}

export declare const TableSelection: React.ComponentType<TableSelectionProps>;
