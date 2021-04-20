import { Table, BandHeaderRow } from '../index';

// tslint:disable-next-line: no-namespace
export namespace TableBandHeader {
  /** Describes properties passed to a component that renders a table band cell. */
  export interface CellProps extends Table.CellProps {
    /** A React node used to render band cell content. */
    children?: React.ReactNode;
    /** Specifies whether to show the left border. */
    beforeBorder?: boolean;
    /** @internal */
    tableRow: BandHeaderRow;
    tabIndex?: number;
    setRefKeyboardNavigation?: any;
  }

  /** Describes properties of column bands that the TableBandHeader plugin renders. */
  export interface ColumnBands {
    /** A column name that is used to identify a column in the bands tree. */
    columnName?: string;
    /** The band's title. Used only for bands and ignored for columns. */
    title?: string;
    /** Nested bands and columns. */
    children?: Array<TableBandHeader.ColumnBands>;
  }
}

export interface TableBandHeaderProps {
  /** A component that renders a band cell. */
  cellComponent: React.ComponentType<TableBandHeader.CellProps>;
  /** A component that renders a band cells' row. */
  rowComponent: React.ComponentType<Table.RowProps>;
  /** Specifies column bands for multi-level table header. */
  columnBands: Array<TableBandHeader.ColumnBands>;
  /** @internal */
  bandedHeaderCellComponent: React.ComponentType<Table.CellProps & { component: React.ReactNode }>;
  /** @internal */
  invisibleCellComponent: React.ComponentType;
}
