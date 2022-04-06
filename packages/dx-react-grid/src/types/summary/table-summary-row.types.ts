import { GetMessageFn } from '@devexpress/dx-core';
import { Table, SummaryType, Column, ColumnSummary } from '../index';

// tslint:disable-next-line: no-namespace
export namespace TableSummaryRow {
  /** Describes properties passed to a component that renders a cell in a summary row. */
  export interface CellProps extends Table.CellProps {
    /** Specifies the cell's column. */
    column: Column;
    /** A React node to be rendered within the cell. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a cell's content. */
  export interface ContentProps {
    /** A React node to be rendered within the cell's content. */
    children?: React.ReactNode;
  }

  /* * Describes properties passed to a component that renders an indent used to identify
   * a row's level.
   * */
  export interface IndentProps {
    /** Specifies the row's level. */
    level: number;
  }

  /** Describes properties passed to a component that renders a summary item. */
  export interface ItemProps {
    /** The summary value */
    value?: number | null;
    /** The summary type */
    type: SummaryType;
    /** A React node used to render the summary value. */
    children?: React.ReactNode;
    /** Returns a localization message by the message key. */
    getMessage: GetMessageFn;
  }

  export interface LocalizationMessages {
    /** Specifies the count type's text. */
    count?: string;
    /** Specifies the summary type's text. */
    sum?: string;
    /** Specifies the minimum type's text. */
    min?: string;
    /** Specifies the maximum type's text. */
    max?: string;
    /** Specifies the average type text. */
    avg?: string;
  }
}

export interface TableSummaryRowProps {
  /** An array of summary types that the `DataTypeProvider` plugin should not format. */
  formatlessSummaryTypes: Array<string>;
  /** A component that renders the total summary row. */
  totalRowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a group summary row. */
  groupRowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a tree summary row. */
  treeRowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a total summary cell. */
  totalCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  /** A component that renders a group summary cell. */
  groupCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  /** A component that renders a tree summary cell. */
  treeCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  /** A component that renders a summary cell within a tree column. */
  treeColumnCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  /** A component that renders a summary cell's content within a tree column. */
  treeColumnContentComponent: React.ComponentType<TableSummaryRow.ContentProps>;
  /** A component that renders an indent used to identify a tree row level within a tree column. */
  treeColumnIndentComponent: React.ComponentType<TableSummaryRow.IndentProps>;
  /** A component that renders a summary item. */
  itemComponent: React.ComponentType<TableSummaryRow.ItemProps>;
  /** An object that specifies localization messages. */
  messages?: TableSummaryRow.LocalizationMessages;
}

/** @internal */
export type SummaryItemProps = {
  summary: ColumnSummary,
  children?: React.ReactNode,
};

/** @internal */
export type TableSummaryContentProps = {
  column: Column;
  columnSummaries: ReadonlyArray<ColumnSummary>;
  formatlessSummaryTypes: string[];
  itemComponent: React.ComponentType<TableSummaryRow.ItemProps>;
  messages: object;
};
