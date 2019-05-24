import { PureComputed } from '@devexpress/dx-core';
import { Table, Column } from '../index';

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
  /** A component that renders a content container */
  containerComponent: React.ComponentType<TableGroupRow.ContainerProps>;
  /** A component that renders a group indent cell. */
  indentCellComponent?: React.ComponentType<TableGroupRow.IndentCellProps>;
  /** The group indent column's width. */
  indentColumnWidth: number;
  /** The group cell's left padding value */
  contentCellPadding: string;
}

/** @internal */
export type ShowColumnWhenGroupedGetterFn = PureComputed<
  [boolean, TableGroupRow.ColumnExtension[] | undefined], (name: string) => boolean
>;
