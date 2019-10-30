import { PureComputed } from '@devexpress/dx-core';
import { GroupSummaryItem, GroupSummaryValue } from '@devexpress/dx-grid-core';
import {
  Table, Column, TableColumn, TableRow, GetMessageFn,
  TableSummaryRow, ColumnSummary,
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
    inlineSummaries: readonly GroupInlineSummary[];
    inlineSummaryComponent: React.ComponentType<InlineSummaryProps>;
    inlineSummaryItemComponent: React.ComponentType<InlineSummaryItemProps>;
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

  export interface InlineSummaryItemProps {
    getMessage: GetMessageFn;
    summary: GroupInlineSummary;
  }

  export interface InlineSummaryProps {
    getMessage: GetMessageFn;
    inlineSummaries: readonly GroupInlineSummary[];
    inlineSummaryItemComponent: React.ComponentType<InlineSummaryItemProps>;
  }

  export interface SummaryCellProps extends Table.CellProps {
    /** The group row. */
    row: GroupRow;
    /** The column associated with the group. */
    column: Column;
    onToggle(): void;
  }

  export interface StubCellProps extends Table.CellProps {
    onToggle(): void;
  }

  export interface LocalizationMessages {
    countOf?: string;
    sumOf?: string;
    maxOf?: string;
    minOf?: string;
    avgOf?: string;
  }

  export type GroupInlineSummary = ColumnSummary & {
    columnTitle: string | undefined;
    messageKey: string;
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
  inlineSummaryItemComponent: React.ComponentType<TableGroupRow.InlineSummaryItemProps>;
  inlineSummaryComponent: React.ComponentType<TableGroupRow.InlineSummaryProps>;
  summaryCellComponent: React.ComponentType<TableGroupRow.SummaryCellProps>;
  summaryItemComponent: React.ComponentType<TableSummaryRow.ItemProps>;
  stubCellComponent: React.ComponentType<TableGroupRow.StubCellProps>;
  /** A component that renders a content container */
  containerComponent: React.ComponentType<TableGroupRow.ContainerProps>;
  /** A component that renders a group indent cell. */
  indentCellComponent?: React.ComponentType<TableGroupRow.IndentCellProps>;
  /** The group indent column's width. */
  indentColumnWidth: number;
  messages?: TableGroupRow.LocalizationMessages;
  formatlessSummaryTypes: string[];
  /** The group cell's left padding value */
  contentCellPadding: string;
}

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
  [TableColumn[], TableRow, GroupSummaryItem[], GroupSummaryValue, string[]],
  TableGroupRow.GroupInlineSummary[]
>;
