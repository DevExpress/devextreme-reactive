import * as React from 'react';

export interface EmptyMessageProps {
  /** Returns the text displayed when all columns are hidden. */
  getMessage: (messageKey: string) => string;
}

export interface TableColumnVisibilityProps {
  /** Hidden column names. */
  hiddenColumnNames: Array<string>;
  /** Names of initially hidden columns in uncontrolled mode. */
  defaultHiddenColumnNames: Array<string>;
  /** Handles hidden columns adding or removing. */
  onHiddenColumnNamesChange: (hiddenColumnNames: Array<string>) => void;
  /** A component that renders a message that is displayed when all columns are hidden. */
  emptyMessageComponent: React.ComponentType<EmptyMessageProps>;
  /** An object that specifies [localization messages]. */
  messages: object;
}

export declare const TableColumnVisibility: React.ComponentType<TableColumnVisibilityProps>;
