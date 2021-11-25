import { Table, GridViewport } from '../index';

// tslint:disable-next-line: no-namespace
export namespace VirtualTable {
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
}

export interface VirtualTableProps {
  /** The virtual table's height. */
  height: number | string;
  /***
   * Estimated row height. Specify the average value for a table whose rows have
   * different heights.
   **/
  estimatedRowHeight: number;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<VirtualTable.ColumnExtension>;
  /** A component that renders a table. */
  tableComponent: React.ComponentType<object>;
  /** A component that renders a table head. */
  headComponent: React.ComponentType<any>;
  /** A component that renders a table body. */
  bodyComponent: React.ComponentType<any>;
  /** A component that renders a table footer. */
  footerComponent: React.ComponentType<any>;
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
  // TODO
  skeletonCellComponent: React.ComponentType<Table.CellProps>;
  /** Handles top row changes. */
  onTopRowChange: (rowId: number | string | symbol | undefined) => void;
  /** A reference to the VirtualTable instance */
  ref?: React.RefObject<typeof VirtualTable>;
}

/** @internal */
export type VirtualTablePluginState = {
  viewport: GridViewport;
  /** Id and index of row, which be scrolled into view */
  nextRowId?: number | string | symbol;
  nextColumnId?: symbol;
};

// tslint:disable-next-line:max-line-length
/** A plugin that renders a scrollable table instead of a static table. Contains the VirtualTable.Row and VirtualTable.Cell components that provide ways to customize virtual table rows and columns. These components can be extended by other plugins. */
export declare const VirtualTable: React.ComponentType<VirtualTableProps> & {
  /** The data column type's indentifier. */
  COLUMN_TYPE: symbol;
  /** The data row type's indentifier. */
  ROW_TYPE: symbol;
  /** The nodata row type's indentifier. */
  NODATA_ROW_TYPE: symbol;
};
