import * as React from 'react';
import {
  TableEditColumnCellProps,
  TableEditColumnHeaderCellProps,
  EditCommandProps,
} from '@devexpress/dx-react-grid';

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
  /** An object that specifies the localization messages. */
  messages: object;
}

interface TableEditColumnComponentType extends React.ComponentClass<TableEditColumnProps> {
  Command: React.ComponentType<EditCommandProps>;
  Cell: React.ComponentType<TableEditColumnCellProps>;
  HeaderCell: React.ComponentType<TableEditColumnHeaderCellProps>;
}

export declare const TableEditColumn: TableEditColumnComponentType;
