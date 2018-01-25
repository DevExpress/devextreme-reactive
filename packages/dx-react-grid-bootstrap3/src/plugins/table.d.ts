import * as React from 'react';
import {
  TableDataCellProps,
  TableDataRowProps,
  TableCellProps,
  TableRowProps,
  TableColumnExtension,
  TableNoDataCellProps,
} from '@devexpress/dx-react-grid';

export interface TableProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<TableColumnExtension>;
  /** A component that renders a table cell. */
  cellComponent?: React.ComponentType<TableDataCellProps>;
  /** A component that renders a table row. */
  rowComponent?: React.ComponentType<TableDataRowProps>;
  /** A component that renders a table cell when the table is empty. */
  noDataCellComponent?: React.ComponentType<TableNoDataCellProps>;
  /** A component that renders a table row when the table is empty. */
  noDataRowComponent?: React.ComponentType<TableRowProps>;
  /** A component that renders a stub table cell if the cell value is not provided. */
  stubCellComponent?: React.ComponentType<TableCellProps>;
  /** A component that renders a stub header cell if the cell value is not provided. */
  stubHeaderCellComponent?: React.ComponentType<TableCellProps>;
  /** An object that specifies the localization messages. */
  messages?: object;
}

interface TableComponentType extends React.ComponentClass<TableProps> {
  /** A component that renders a table data cell. */
  Cell: TableDataCellProps;
  /** A component that renders a table data row. */
  Row: TableDataRowProps;
  /** A component that renders a table cell when the table is empty. */
  NoDataCell: TableCellProps;
  /** A component that renders a table row when the table is empty. */
  NoDataRow: TableRowProps;
  /** A component that renders a stub table cell. */
  StubCell: TableCellProps;
  /** A component that renders a stub table header cell. */
  StubHeaderCell: TableCellProps;
}

export declare const Table: TableComponentType;
