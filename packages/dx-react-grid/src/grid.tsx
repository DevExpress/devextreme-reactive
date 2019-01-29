import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';
import { Column } from './column';

// tslint:disable-next-line:no-namespace
export namespace Grid {
  /** Describes properties passed to a component that renders the grid root layout. */
  export interface RootProps {
    /** A React node to be placed in the root layout. */
    children?: React.ReactNode;
  }
}

export interface GridProps {
  /*** An array containing custom data. A user defines the access to this data.
   * Refer to Data Accessors for details. */
  rows: any[];
  /** Specifies for which row fields columns are created. */
  columns: Column[];
  /*** Specifies the function used to get a unique row identifier.
   * Define this function if the identifier is different than the row index. */
  getRowId?: (row: any) => number | string;
  /** Specifies the function used to get a cell's value. */
  getCellValue?: (row: any, columnName: string) => any;
  /** A component that renders the grid root layout. */
  rootComponent: React.ComponentType<Grid.RootProps>;
}

export const Grid: React.SFC<GridProps> = ({
  rows,
  columns,
  getRowId,
  getCellValue,
  rootComponent,
  children,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootComponent={rootComponent}
    />
    {children}
  </PluginHost>
);
