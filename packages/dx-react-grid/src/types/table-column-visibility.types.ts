// tslint:disable-next-line: no-namespace
export namespace TableColumnVisibility {
  /** Describes the empty message component's properties. */
  export interface EmptyMessageProps {
    /** Returns the text displayed when all columns are hidden. */
    getMessage: (messageKey: string) => string;
  }

  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether an end-user can change column visibility. */
    togglingEnabled: boolean;
  }

  export interface LocalizationMessages {
    /** Specifies the text that is displayed when the plugin does not contain visible columns. */
    noColumns?: string;
  }
}

export interface TableColumnVisibilityProps {
  /** Hidden column names. */
  hiddenColumnNames?: Array<string>;
  /** Names of initially hidden columns in the uncontrolled mode. */
  defaultHiddenColumnNames?: Array<string>;
  /** Specifies whether an end-user can change column visibility. */
  columnTogglingEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<TableColumnVisibility.ColumnExtension>;
  /** Handles hidden columns adding or removing. */
  onHiddenColumnNamesChange?: (hiddenColumnNames: Array<string>) => void;
  /** A component that renders a message that is displayed when all columns are hidden. */
  emptyMessageComponent: React.ComponentType<TableColumnVisibility.EmptyMessageProps>;
  /** An object that specifies localization messages. */
  messages?: TableColumnVisibility.LocalizationMessages;
}

/** @internal */
export type TableColumnVisibilityState = {
  hiddenColumnNames: string[],
};
