import { ColumnDimensions, Table, TableRowProps } from '../index';

// tslint:disable-next-line: no-namespace
export namespace TableFixedColumns {
  /** Describes properties passed to a component that renders a fixed column's cell. */
  export interface CellProps extends Table.CellProps {
    /** Specifies the side of the table to which the cell should be fixed. */
    side: 'left' | 'right';
    /** A component that should be rendered as a fixed cell. */
    component: React.ComponentType<Table.CellProps>;
    /** Specifies whether to render the left divider. */
    showLeftDivider: boolean;
    /** Specifies whether to render the right divider. */
    showRightDivider: boolean;
    /** Specifies the fixed cell's position. */
    position: number;
    /** @internal */
    selected: boolean;
  }
}

export interface TableFixedColumnsProps {
  /** Specifies names and types of the columns to be fixed to the left grid's side. */
  leftColumns?: Array<string | symbol>;
  /** Specifies names and types of the columns to be fixed to the right grid's side. */
  rightColumns?: Array<string | symbol>;
  /** A component that renders a fixed column's cell. */
  cellComponent: React.ComponentType<TableFixedColumns.CellProps>;
  /** @internal */
  listenerRowComponent: React.ComponentType<TableRowProps>;
  /** @internal */
  listenerCellComponent: React.ComponentType<ListenerCellProps>;
}

/** @internal */
export type TableFixedColumnsState = {
  tableColumnDimensions: ColumnDimensions,
};

type ListenerCellProps = {
  onSizeChange: (size: { width: number, height: number }) => void,
  listen: boolean,
};
