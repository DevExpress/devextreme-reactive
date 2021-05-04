import { Table } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace TableEditColumn {
  /** Describes properties passed to a data row's command cell component. */
  export interface CellProps extends Table.CellProps {
    /** Specifies an edited table row with the applied changes. */
    row: any;
    /** A React node to be placed in the command cell. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a command cell within the header row. */
  export interface HeaderCellProps extends Table.CellProps {
    /** A React node to be placed in the command cell. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders command control within a command cell. */
  export interface CommandProps {
    /** The command identifier. */
    id: 'add' | 'edit' | 'delete' | 'commit' | 'cancel';
    /** The command action description. */
    text: string;
    /** An event initiating the command execution. */
    onExecute(): void;
  }

  export interface LocalizationMessages {
    /** Specifies the add command button text. */
    addCommand?: string;
    /** Specifies the edit command button text. */
    editCommand?: string;
    /** Specifies the delete command button text. */
    deleteCommand?: string;
    /** Specifies the commit command button text. */
    commitCommand?: string;
    /** Specifies the cancel command button text. */
    cancelCommand?: string;
  }
}

export interface TableEditColumnProps {
  /** A component that renders a command cell within a data row. */
  cellComponent: React.ComponentType<TableEditColumn.CellProps>;
  /** A component that renders a command cell within the header row. */
  headerCellComponent: React.ComponentType<TableEditColumn.HeaderCellProps>;
  /** A component that renders command control within a command cell. */
  commandComponent: React.ComponentType<TableEditColumn.CommandProps>;
  /** Specifies whether to render the 'New' command within the header row's command cell. */
  showAddCommand?: boolean;
  /** Specifies whether to render the 'Edit' command within the data row's command cell. */
  showEditCommand?: boolean;
  /** Specifies whether to render the 'Delete' command within the data row's command cell. */
  showDeleteCommand?: boolean;
  /** Specifies the command column's width. */
  width?: number | string;
  /** An object that specifies the localization messages. */
  messages?: TableEditColumn.LocalizationMessages;
}
/* tslint:enable no-namespace max-line-length */
