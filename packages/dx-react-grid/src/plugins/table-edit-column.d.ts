import * as React from 'react';

export interface TableEditColumnCellProps {
  /** Specifies an edited table row with the applied changes. */
  row: any;
  /** A React element to be placed in the command cell. */
  children?: React.ReactNode;
}

export interface TableEditColumnHeaderCellProps {
  /** A React element to be placed in the command cell. */
  children?: React.ReactNode;
}

export interface EditCommandProps {
  /** The command identifier. */
  id: 'add' | 'edit' | 'delete' | 'commit' | 'cancel';
  /** The command action description. */
  text: string;
  /** An event initiating the command execution. */
  onExecute: () => void;
}

export interface TableEditColumnProps {
  /** A component that renders a command cell within a data row. */
  cellComponent: React.ComponentType<TableEditColumnCellProps>;
  /** A component that renders a command cell within the header row. */
  headerCellComponent: React.ComponentType<TableEditColumnHeaderCellProps>;
  /** A component that renders command control within a command cell. */
  commandComponent: React.ComponentType<EditCommandProps>;
  /** Specifies whether to render the 'New' command within the header row's command cell. */
  showAddCommand: boolean;
  /** Specifies whether to render the 'Edit' command within the data row's command cell. */
  showEditCommand: boolean;
  /** Specifies whether to render the 'Delete' command within the data row's command cell. */
  showDeleteCommand: boolean;
  /** Specifies the command column's width. */
  width: number | string;
  /** An object that specifies the [localization messages]. */
  messages: object;
}

export declare const TableEditColumn: React.ComponentType<TableEditColumnProps>;
