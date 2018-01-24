import * as React from 'react';
import { Column } from '../grid';
import { TableRowProps } from './table';

export interface TableHeaderCellProps {
  /** A column object associated with a header cell. */
  column: Column;
  /** Specifies whether to render controls that toggle the column's sorting state. */
  showSortingControls: boolean;
  /** Specifies the associated column's sorting direction. */
  sortingDirection?: 'asc' | 'desc';
  /** An event that initiates changing the column sorting direction. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `direction` is set to null. */
  onSort: (parameters: { direction?: 'asc' | 'desc' | null, keepOther?: boolean }) => void;
  /** Specifies whether to display a button that groups data by column. */
  showGroupingControls: boolean;
  /** An event that invokes grouping by the associated column. */
  onGroup: () => void;
  /** Specifies whether table column resizing is enabled. */
  resizingEnabled: boolean;
  /** An event that initiates column width changing. The initial column width increases by the `shift` value or decreases if `shift` is negative. */
  onWidthChange: ({ shift: number }) => void;
  /** An event that changes the column width used for preview. The initial column width increases by the `shift` value or decreases if `shift` is less than zero. */
  onWidthDraft: ({ shift: number }) => void;
  /** An event that cancels changes of column width used for preview. */
  onWidthDraftCancel: () => void;
  /** Specifies whether drag-and-drop is enabled. */
  draggingEnabled: boolean;
  /** Returns the text displayed in a sorting control within the header cell. */
  getMessage: (messageKey: string) => string;
}

export interface TableHeaderRowProps {
  /** A component that renders a header cell. */
  cellComponent: React.ComponentType<TableHeaderCellProps>;
  /** A component that renders a header row. */
  rowComponent: React.ComponentType<TableRowProps>;
  /** Specifies whether to render controls that toggle the column's sorting state. Requires the SortingState dependency. */
  showSortingControls: boolean;
  /** Specifies whether to display a button that groups data by column. Requires the GroupingState dependency. */
  showGroupingControls: boolean;
  /** An object that specifies [localization messages]. */
  messages: object;
}

export declare const TableHeaderRow: React.ComponentType<TableHeaderRowProps>;
