import * as React from 'react';
import {
  EmptyMessageProps,
} from '@devexpress/dx-react-grid';

export interface TableColumnVisibilityProps {
  /** Hidden column names. */
  hiddenColumnNames: Array<string>;
  /** Names of initially hidden columns in uncontrolled mode. */
  defaultHiddenColumnNames: Array<string>;
  /** Handles hidden columns adding or removing. */
  onHiddenColumnNamesChange: (hiddenColumnNames: Array<string>) => void;
  /** A component that renders a message that is displayed when all columns are hidden. */
  emptyMessageComponent?: React.ComponentType<EmptyMessageProps>;
  /** An object that specifies localization messages. */
  messages?: object;
}

interface TableColumnVisibilityComponentType extends React.ComponentClass<TableColumnVisibilityProps> {
  EmptyMessage: React.ComponentType<EmptyMessageProps>;
}

export declare const TableColumnVisibility: TableColumnVisibilityComponentType;
