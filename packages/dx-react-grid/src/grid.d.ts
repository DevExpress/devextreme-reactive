import * as React from 'react';

export interface Column {
  /** Specifies the column name or the name of a row field whose value the column displays. If the column name does not match any field name, specify the getCellValue function. */
  name: string;
  /** Specifies the column title. */
  title?: string;
  /** Specifies the function used to get the column value for a given row. */
  getCellValue?: (row: any, columnName: string) => any;
}

export interface GridRootProps {
  children?: React.ReactNode | Array<React.ReactNode>;
}

export interface GridProps {
  /** An array containing custom data. A user defines the access to this data. Refer to Data Accessors for details. */
  row: Array<any>;
  /** Specifies for which row fields columns are created. */
  columns: Array<Column>;
  /** Specifies the function used to get a unique row identifier. */
  getRowId: (row: any) => number | string;
  /** Specifies the function used to get a cell’s value. */
  getCellValue: (row: any, columnName: string) => any;
  /** A component that renders the grid root layout. */
  rootComponent: React.ComponentType<GridRootProps>;
}

export declare const Grid: React.ComponentType<GridProps>;
