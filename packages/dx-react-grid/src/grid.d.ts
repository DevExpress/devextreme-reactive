import * as React from 'react';

/** Defines the column configuration object. Used to display data stored in a row. */
export type Column = {
  /** Specifies the column name or the name of a row field whose value the column displays. If the column name does not match any field name, specify the getCellValue function. */
  name: string;
  /** Specifies the column title. */
  title?: string;
  /** Specifies the function used to get the column value for a given row. */
  getCellValue?: (row: any, columnName: string) => any;
}

export namespace Grid {
  /** Describes properties passed to a component that renders the grid root layout. */
  export interface RootProps {
    /** A React element to be placed in the root layout. */
    children?: React.ReactNode | Array<React.ReactNode>;
  }
}

export interface GridProps<T = React.ComponentType<Grid.RootProps>> {
  /** An array containing custom data. A user defines the access to this data. Refer to Data Accessors for details. */
  rows: Array<any>;
  /** Specifies for which row fields columns are created. */
  columns: Array<Column>;
  /** Specifies the function used to get a unique row identifier. */
  getRowId?: (row: any) => number | string;
  /** Specifies the function used to get a cell’s value. */
  getCellValue?: (row: any, columnName: string) => any;
  /** A component that renders the grid root layout. */
  rootComponent: T;
}

// export interface GridProps {
//   /** An array containing custom data. A user defines the access to this data. Refer to Data Accessors for details. */
//   rows: Array<any>;
//   /** Specifies for which row fields columns are created. */
//   columns: Array<Grid.Column>;
//   /** Specifies the function used to get a unique row identifier. */
//   getRowId?: (row: any) => number | string;
//   /** Specifies the function used to get a cell’s value. */
//   getCellValue?: (row: any, columnName: string) => any;
//   /** A component that renders the grid root layout. */
//   rootComponent: React.ComponentType<Grid.RootProps>;
// }

export declare const Grid: React.ComponentType<GridProps>;
