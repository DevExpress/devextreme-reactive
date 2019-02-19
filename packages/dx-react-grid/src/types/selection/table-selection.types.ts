import { Table } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace TableSelection {
  /** Describes properties passed to a component that renders a cell containing the Select All checkbox. */
  export interface HeaderCellProps extends Table.CellProps {
    /** Indicates if there are no rows that can be selected. */
    disabled: boolean;
    /** Indicates whether all the rows available for selection are selected. */
    allSelected: boolean;
    /** Indicates whether at least one but not all rows available for selection are selected. */
    someSelected: boolean;
    /** Toggles the Select All checkbox state. */
    onToggle: (select?: boolean) => void;
  }
  /** Describes properties passed to a component that renders a cell containing a selection checkbox. */
  export interface CellProps extends Table.CellProps {
    /** A row. */
    row: any;
    /** Indicates whether a row is selected. */
    selected: boolean;
    /** An event that initiates row selecting or deselecting. */
    onToggle(): void;
  }

  export interface RowProps extends Table.RowProps {
    selected?: boolean;
    selectByRowClick?: boolean;
    onToggle(): void;
  }
}

export interface TableSelectionProps {
  /** Specifies whether to highlight the selected rows. Note that `Table` plugin's `rowComponent` is ignored in this case. */
  highlightRow?: boolean;
  /** Specifies whether a user can select/deselect a row by clicking it. Note that `Table` plugin's `rowComponent` is ignored in this case. */
  selectByRowClick?: boolean;
  /** Specifies whether to render the Select All checkbox in the header row. */
  showSelectAll?: boolean;
  /** Specifies whether to render the selection column that displays selection checkboxes. */
  showSelectionColumn?: boolean;
  /** A component that renders a selection cell . */
  cellComponent: React.ComponentType<TableSelection.CellProps>;
  /** A component that renders a cell containing the Select All checkbox. */
  headerCellComponent: React.ComponentType<TableSelection.HeaderCellProps>;
  /** The selection column's width. */
  selectionColumnWidth: number;

  rowComponent: React.ComponentType<TableSelection.RowProps>;
}
/* tslint:enable no-namespace max-line-length */
