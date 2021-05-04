import { TableRow, TableColumn, Column, TableLayoutProps } from '../index';

// tslint:disable-next-line: no-namespace
export namespace Table {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of the column to extend. */
    columnName: string;
    /** The table column width. */
    width?: number | string;
    /** The table column alignment. */
    align?: 'left' | 'right' | 'center';
    /** Specifies whether word wrap is enabled in a column's cells. */
    wordWrapEnabled?: boolean;
  }

  /** Describes properties passed to a component that renders a generic table cell. */
  export interface CellProps {
    /** Specifies a table row. */
    tableRow: TableRow;
    /** Specifies a table column. */
    tableColumn: TableColumn;
    /** The count of columns that the root cell element spans. */
    colSpan?: number;
    /** The count of rows that the root cell element spans. */
    rowSpan?: number;
    /** @internal */
    style: object;
  }

  /** Describes properties passed to a component that renders a table cell. */
  export interface DataCellProps extends Table.CellProps {
    /** Specifies a value to be rendered within the cell. */
    value: any;
    /** Specifies the cell's row. */
    row: any;
    /** Specifies the cell's column. */
    column: Column;
    /** A React node used to render the cell content. */
    children?: React.ReactNode;
  }

// tslint:disable-next-line: max-line-length
  /** Describes properties passed to a component that renders a table cell when the table is empty. */
  export interface NoDataCellProps extends Table.CellProps {
    /** Returns the text displayed in a cell when a table is empty. */
    getMessage: (messageKey: string) => string;
  }

  /** Describes properties passed to a component that renders a generic table row. */
  export interface RowProps {
    /** A table row. */
    tableRow: TableRow;
    /** A React node used to render a table row. */
    children: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a table row. */
  export interface DataRowProps extends Table.RowProps {
    /** A row. */
    row: any;
    /** @internal */
    style?: object;
  }

  export interface LocalizationMessages {
    /** Specifies text shown when the Grid does not contain data. */
    noData?: string;
  }

  export interface InnerTableProps {
    tableRef?: React.RefObject<HTMLTableElement>;
    style: React.CSSProperties;
  }
}

export interface TableProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<Table.ColumnExtension>;
  /** A component that renders a table. */
  tableComponent: React.ComponentType<Table.InnerTableProps>;
  /** A component that renders a table head. */
  headComponent: React.ComponentType<object>;
  /** A component that renders a table body. */
  bodyComponent: React.ComponentType<object>;
  /** A component that renders a table footer. */
  footerComponent: React.ComponentType<object>;
  /** A component that renders a table's container. */
  containerComponent: React.ComponentType<object>;
  /** A component that renders a table cell. */
  cellComponent: React.ComponentType<Table.DataCellProps>;
  /** A component that renders a table row. */
  rowComponent: React.ComponentType<Table.DataRowProps>;
  /** A component that renders a table cell when the table is empty. */
  noDataCellComponent: React.ComponentType<Table.NoDataCellProps>;
  /** A component that renders a table row when the table is empty. */
  noDataRowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a stub table row if the row type is not recognized. */
  stubRowComponent: React.ComponentType<Table.RowProps>;
  /** A component that renders a stub table cell if the cell value is not provided. */
  stubCellComponent: React.ComponentType<Table.CellProps>;
  /** A component that renders a stub header cell if the cell value is not provided. */
  stubHeaderCellComponent: React.ComponentType<Table.CellProps>;
  /** An object that specifies the localization messages. */
  messages?: Table.LocalizationMessages;
  /** @internal */
  layoutComponent: React.ComponentType<TableLayoutProps>;
}

/** @internal */
export type TableCellProps = Table.CellProps;
/** @internal */
export type TableRowProps = Table.RowProps;

/** @internal */
export type CellPlaceholderProps = Table.CellProps;
