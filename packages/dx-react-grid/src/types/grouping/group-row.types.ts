import { PureComputed, GetMessageFn } from '@devexpress/dx-core';
import { GroupSummaryItem, GroupSummaryValue } from '@devexpress/dx-grid-core';
import {
  Table, Column, TableRow,
  TableSummaryRow, ColumnSummary
} from '../index';

// tslint:disable-next-line: no-namespace
export namespace TableGroupRow {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether the grid displays the column by which data is grouped. */
    showWhenGrouped?: boolean;
  }

  /** Describes properties passed to a component that renders a group cell. */
  export interface CellProps extends Table.CellProps {
    /** The group row. */
    row: GroupRow;
    /** The column associated with the group. */
    column: Column;
    /** Specifies whether the row is expanded. */
    expanded: boolean;
    /** An event that initiates group row expanding or collapsing. */
    onToggle(): void;

    /** @internal */
    contentComponent: React.ComponentType<ContentProps>;
    /** @internal */
    iconComponent: React.ComponentType<IconProps>;
    /** @internal */
    containerComponent: React.ComponentType<ContainerProps>;
    /** @internal */
    position: string;
    /** @internal */
    side: string;
    /* Summary items in this container. */
    readonly inlineSummaries: Readonly<InlineSummaryItemInfo[]>;
    /* A component that renders a container for group summary items in a group caption. */
    inlineSummaryComponent: React.ComponentType<InlineSummaryProps>;
    /* A component that renders an inline group summary item. */
    inlineSummaryItemComponent: React.ComponentType<InlineSummaryItemProps>;
    /* A function that uses the message ID to get a localized message. */
    getMessage: (string) => string;
  }

  /** Describes properties passed to a component that renders a group row. */
  export interface RowProps extends Table.RowProps {
    /** The group row. */
    row: GroupRow;
  }

  /** Describes properties passed to a component that renders a group cell content. */
  export interface ContentProps {
    /** The group row. */
    row: GroupRow;
    /** The column associated with the group. */
    column: Column;
    /** A React node to be rendered within the cell content. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a group expand icon. */
  export interface IconProps {
    /** Specifies whether the row is expanded. */
    expanded: boolean;
  }

  export interface ContainerProps {
    children: React.ReactNode;
    style: object;
  }

  /** Describes properties passed to a component that renders a group indent cell. */
  export interface IndentCellProps extends Table.CellProps {
    /** The group row. */
    row: GroupRow;
    /** A column associated with the group. */
    column: Column;
  }

  /* Describes properties passed to a component that renders a summary item in a group caption. */
  export interface InlineSummaryItemProps {
    /* A function that gets a localized message by message ID. */
    getMessage: GetMessageFn;
    /* The summary item. */
    summary: InlineSummaryItemInfo;
  }

  /* Describes properties passed to a component that renders a container for summary items
  to be displayed in a group caption. */
  export interface InlineSummaryProps {
    /* A function that uses the message ID to get a localized message. */
    getMessage: GetMessageFn;
    /* Summary items in this container. */
    readonly inlineSummaries: InlineSummaryItemInfo[];
    /* A component that renders an inline group summary item. */
    inlineSummaryItemComponent: React.ComponentType<InlineSummaryItemProps>;
  }

  /* Describes properties passed to a component that renders a cell
  for a summary item in an appropriate column. */
  export interface SummaryCellProps extends Table.CellProps {
    /** The group row. */
    row: GroupRow;
    /** The column associated with the group. */
    column: Column;
    /* A function that is executed when the group row
    is expanded or collapsed. */
    onToggle(): void;
  }

  /* Describes properties passed to a component that renders a stub cell used
  to align summary items in their columns. */
  export interface StubCellProps extends Table.CellProps {
    /* A function that is executed when a group row
    is expanded or collapsed. */
    onToggle(): void;
  }

  export interface LocalizationMessages extends TableSummaryRow.LocalizationMessages {
    /* Specifies a text for a `count` summary item when it is displayed in a group caption. */
    countOf?: string;
    /* Specifies a text for a `sum` summary item when it is displayed in a group caption. */
    sumOf?: string;
    /* Specifies a text for a `max` summary item when it is displayed in a group caption. */
    maxOf?: string;
    /* Specifies a text for a `min` summary item when it is displayed in a group caption. */
    minOf?: string;
    /* Specifies a text for a `avg` summary item when it is displayed in a group caption. */
    avgOf?: string;
  }

  /* Describes a summary item to be displayed in a group caption. */
  export type InlineSummaryItemInfo = ColumnSummary & {
    /* The title of the column for which the summary item is calculated. */
    columnTitle: string | undefined;
    /* A key used to get a localized message. */
    messageKey: string;
    /* A React node used to render the summary value. */
    component: React.FunctionComponent<any>;
  };
}

/** Describes the group row structure. */
export interface GroupRow {
  /** The current group key. */
  key: number | string;
  /** The current group value. */
  value: any;
}

export interface TableGroupRowProps {
  /***
   * A Boolean value that specifies whether the grid's table
   * displays a column by which data is grouped.
   **/
  showColumnsWhenGrouped?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<TableGroupRow.ColumnExtension>;
  /** A component that renders a group cell. */
  cellComponent: React.ComponentType<TableGroupRow.CellProps>;
  /** A component that renders a group row. */
  rowComponent: React.ComponentType<TableGroupRow.RowProps>;
  /** A component that renders a group cell content. */
  contentComponent: React.ComponentType<TableGroupRow.ContentProps>;
  /** A component that renders a group expand icon. */
  iconComponent: React.ComponentType<TableGroupRow.IconProps>;
  /* A component that renders an inline group summary item. */
  inlineSummaryItemComponent: React.ComponentType<TableGroupRow.InlineSummaryItemProps>;
  /* A component that renders a container for group summary items in a group caption. */
  inlineSummaryComponent: React.ComponentType<TableGroupRow.InlineSummaryProps>;
  /* A component that renders a cell for a group summary item in an appropriate column. */
  summaryCellComponent: React.ComponentType<TableGroupRow.SummaryCellProps>;
  /* A component that renders a group summary item in its column. */
  summaryItemComponent: React.ComponentType<TableSummaryRow.ItemProps>;
  /* A component that renders a stub cell used to align summary items in their columns. */
  stubCellComponent: React.ComponentType<TableGroupRow.StubCellProps>;
  /** A component that renders a content container */
  containerComponent: React.ComponentType<TableGroupRow.ContainerProps>;
  /** A component that renders a group indent cell. */
  indentCellComponent?: React.ComponentType<TableGroupRow.IndentCellProps>;
  /** The group indent column's width. */
  indentColumnWidth: number;
  /* Localization messages. */
  messages?: TableGroupRow.LocalizationMessages;
  /* Summary types that the `DataTypeProvider` plugin should not format. */
  formatlessSummaryTypes: string[];
  /** The group cell's left padding value */
  contentCellPadding: string;
}

/** @internal */
export type TableColumnsWithGroupingProps =
  Partial<Pick<TableGroupRowProps, 'indentColumnWidth'>> &
  Pick<TableGroupRowProps, 'showColumnsWhenGrouped' | 'columnExtensions'>;

/** @internal */
export type ShowColumnWhenGroupedGetterFn = PureComputed<
  [boolean, TableGroupRow.ColumnExtension[] | undefined], (name: string) => boolean
>;

/** @internal */
export type GetInlineSummaryComponent = PureComputed<
  [Column, ColumnSummary, string[]],
  React.FunctionComponent<any>
>;

/** @internal */
export type FlattenGroupInlineSummariesFn = PureComputed<
  [Column[], TableRow, GroupSummaryItem[], GroupSummaryValue, string[]],
  TableGroupRow.InlineSummaryItemInfo[]
>;
