import * as React from 'react';
import {
  Grid as GridBase,
  Column,
} from '@devexpress/dx-react-grid';

export interface GridProps {
  /** An array containing custom data. A user defines the access to this data. Refer to Data Accessors for details. */
  rows: Array<any>;
  /** Specifies for which row fields columns are created. */
  columns: Array<Column>;
  /** Specifies the function used to get a unique row identifier. */
  getRowId?: (row: any) => number | string;
  /** Specifies the function used to get a cell’s value. */
  getCellValue?: (row: any, columnName: string) => any;
  /** A component that renders the grid root layout. */
  rootComponent?: React.ComponentType<GridBase.RootProps>;
}

interface GridComponentType extends React.ComponentClass<GridProps> {
  /** A component that renders the grid root layout. */
  Root: React.ReactElement<GridBase.RootProps>;
}

export declare const Grid: GridComponentType;
