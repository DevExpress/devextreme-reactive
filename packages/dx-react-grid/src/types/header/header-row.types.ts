import { Table, Column, CellWidthGetter } from '../index';

// tslint:disable: max-line-length
// tslint:disable-next-line: no-namespace
export namespace TableHeaderRow {
  /** Describes properties used to render a table header cell. */
  export interface CellProps extends Table.CellProps {
    /** A column object associated with the header cell. */
    column: Column;
    /** Specifies whether the column's resizing is enabled. */
    resizingEnabled: boolean;
    /** An event that initiates the column width change. The initial column width increases by the `shift` value or decreases if `shift` is negative. */
    onWidthChange: (parameters: { shift: number }) => void;
    /** An event that changes the column width used for preview. The initial column width increases by the `shift` value or decreases if `shift` is less than zero. */
    onWidthDraft: (parameters: { shift: number }) => void;
    /** An event that cancels the column width change used for preview. */
    onWidthDraftCancel(): void;
    /** The header cell's getter, which provide width */
    getCellWidth: (getter: CellWidthGetter) => void;
    /** Specifies whether drag-and-drop is enabled. */
    draggingEnabled: boolean;
    /** The header cell's children. */
    children: React.ReactNode;
    tabIndex?: number;
    setRefKeyboardNavigation?: any;
  }

  /** Describes properties used to render a sort label. */
  export interface SortLabelProps {
    /** A column object associated with the sort label. */
    column: Column;
    /** The sort label alignment. */
    align: string;
    /** The sorting direction. */
    direction: 'asc' | 'desc' | null;
    /** An event that invokes a sorting direction change. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `direction` is set to null. */
    onSort: (parameters: { direction?: 'asc' | 'desc' | null, keepOther?: boolean }) => void;
    /** Specifies whether the sort label is disabled. */
    disabled: boolean;
    /** Returns the sort label's text. */
    getMessage: (messageKey: string) => string;
    /** The sort label's children. */
    children: React.ReactNode;
  }

  /** Describes properties used to render a cell content. */
  export interface ContentProps {
    /** A column object associated with the cell content. */
    column: Column;
    /** The content alignment. */
    align: string;
    /** The content's children. */
    children: React.ReactNode;
  }

  /** Describes properties used to render a group button. */
  export interface GroupButtonProps {
    /** Specifies whether the group button is disabled. */
    disabled: boolean;
    /** An event that invokes grouping by the associated column. */
    onGroup(): void;
  }

  export interface LocalizationMessages {
    /** Specifies the 'Sort' hint's text. Available in the "\@devexpress/dx-react-grid-material-ui" package. */
    sortingHint?: string;
  }
}

export interface TableHeaderRowProps {
  /** A component that renders a header cell. */
  cellComponent: React.ComponentType<TableHeaderRow.CellProps>;
  /** A component that renders a header row. */
  rowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a header cell's content. */
  contentComponent: React.ComponentType<TableHeaderRow.ContentProps>;
  /** A component that renders a sort label. */
  sortLabelComponent: React.ComponentType<TableHeaderRow.SortLabelProps>;
  /** A component that renders a title. */
  titleComponent: React.ComponentType<object>;
  /** A component that renders a group button. */
  groupButtonComponent: React.ComponentType<TableHeaderRow.GroupButtonProps>;
  /** Specifies whether to render controls that toggle the column's sorting state. Requires the SortingState dependency. */
  showSortingControls?: boolean;
  /** Specifies whether to display a button that groups data by column. Requires the GroupingState dependency. */
  showGroupingControls?: boolean;
  /** An object that specifies localization messages. */
  messages?: TableHeaderRow.LocalizationMessages;
}
