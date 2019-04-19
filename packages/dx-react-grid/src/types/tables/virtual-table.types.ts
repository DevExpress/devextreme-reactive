import { Table } from '../index';

export interface VirtualTableProps {
  /** The virtual table's height. */
  height: number | string;
  /***
   * Estimated row height. Specify the average value for a table whose rows have
   * different heights.
   **/
  estimatedRowHeight: number;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<Table.ColumnExtension>;
  /** A component that renders a table. */
  tableComponent: React.ComponentType<object>;
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
  headTableComponent: React.ComponentType<object>;
  /** @internal */
  footerTableComponent: React.ComponentType<object>;
  // TODO
  skeletonCellComponent: React.ComponentType<Table.CellProps>;
  // onViewportTopChange: (number) => void;
}

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
