import { Table, Filter, Column, ColumnFilterOperations } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace TableFilterRow {
  /** Describes properties passed to a component that renders a filter cell. */
  export interface CellProps extends Table.CellProps {
    /** Filtering options that are applied to a column. */
    filter: Filter | null;
    /** An event that initiates applying a new filter to a column. */
    onFilter: (filter: Filter | null) => void;
    /** A column. */
    column: Column;
    /** Specifies whether filtering by column is enabled. */
    filteringEnabled: boolean;
    /** Returns the filter editor placeholder text. Available in the "\@devexpress/dx-react-grid-material-ui" package. */
    getMessage: (messageKey: string) => string;
  }

  /** Describes properties passed to a component that renders a filter selector. */
  export interface FilterSelectorProps {
    /** A component that renders filter selector icons. */
    iconComponent: React.ComponentType<TableFilterRow.IconProps>;
    /** The currently selected filter operation. */
    value: string;
    /** The list of available filter operations. */
    availableValues: Array<string>;
    /** Handles filter operation changes. */
    onChange: (value: string) => void;
    /** Specifies whether the FilterSelector is disabled. */
    disabled: boolean;
    /** Returns the specified localization message. */
    getMessage: (messageKey: string) => string;
    /** @internal */
    toggleButtonComponent: React.ComponentType<ToggleButtonProps>;
  }

  /** Describes properties passed to a component that renders a filter selector icon. */
  export interface IconProps {
    /** Specifies the icon type. */
    type: string;
  }

  /** Describes properties passed to a component that renders a filter editor. */
  export interface EditorProps {
    /** The current editor value. */
    value: any;
    /** Specifies whether the editor is disabled. */
    disabled: boolean;
    /** Handles filter value changes. */
    onChange: (value: string) => void;
    /** Returns the specified localization message. */
    getMessage: (messageKey: string) => string;
  }

  /** Describes properties passed to a component that renders a toggle button for a filter selector. */
  export interface ToggleButtonProps {
    /** Specifies whether the editor is disabled. */
    disabled?: boolean;
    /** Handles filter value changes. */
    onToggle(): void;
    /** A function that accepts the button's root React element. */
    buttonRef: (ref: React.ReactInstance) => void;
    /** A React node used to render the button content. */
    children?: React.ReactNode;
  }

  export interface LocalizationMessages {
    /** The filter editor placeholder text. */
    filterPlaceholder?: string;
    /** The 'contains' filter operation name. */
    contains?: string;
    /** The 'notContains' filter operation name. */
    notContains?: string;
    /** The 'startsWith' filter operation name. */
    startsWith?: string;
    /** The 'endsWith' filter operation name. */
    endsWith?: string;
    /** The 'equal' filter operation name. */
    equal?: string;
    /** The 'notEqual' filter operation name. */
    notEqual?: string;
    /** The 'greaterThan' filter operation name. */
    greaterThan?: string;
    /** The 'greaterThanOrEqual' filter operation name. */
    greaterThanOrEqual?: string;
    /** The 'lessThan' filter operation name. */
    lessThan?: string;
    /** The 'lessThanOrEqual' filter operation name. */
    lessThanOrEqual?: string;
    /** Additional filter operation names */
    [key: string]: string;
  }
}

export interface TableFilterRowProps {
  /** A component that renders a filter cell. */
  cellComponent: React.ComponentType<TableFilterRow.CellProps>;
  /** A component that renders a filter row. */
  rowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a filter selector. */
  filterSelectorComponent: React.ComponentType<TableFilterRow.FilterSelectorProps>;
  /** A component that renders filter selector icons. */
  iconComponent: React.ComponentType<TableFilterRow.IconProps>;
  /** A component that renders a filter editor. */
  editorComponent: React.ComponentType<TableFilterRow.EditorProps>;
  /** A component that renders a filter selector's toggle button. */
  toggleButtonComponent: React.ComponentType<TableFilterRow.ToggleButtonProps>;
  /** Specifies whether the FilterSelector should be displayed. */
  showFilterSelector?: boolean;
  /** The filter row's height. */
  rowHeight?: number;
  /** An object that specifies localization messages. */
  messages?: TableFilterRow.LocalizationMessages;
}

/** @internal */
export type TableFilterRowState = {
  filterOperations: ColumnFilterOperations,
};
/* tslint:enable no-namespace max-line-length */