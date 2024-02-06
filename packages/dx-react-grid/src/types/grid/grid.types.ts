import { Column } from '../index';

// tslint:disable-next-line:no-namespace
export namespace Grid {
  /** Describes properties passed to a component that renders the grid root layout. */
  export interface RootProps {
    /** A React node to be placed in the root layout. */
    children?: React.ReactNode;
    /** @internal */
    rootRef: React.RefObject<HTMLTableElement>;
  }
}

export type GridProps = React.PropsWithChildren<{
  /*** An array containing custom data. A user defines the access to this data.
   * Refer to Data Accessors for details. */
  rows: ReadonlyArray<any>;
  /** Specifies for which row fields columns are created. */
  columns: ReadonlyArray<Column>;
  /*** Specifies the function used to get a unique row identifier.
   * Define this function if the identifier is different than the row index. */
  getRowId?: (row: any) => number | string;
  /** Specifies the function used to get a cell's value. */
  getCellValue?: (row: any, columnName: string) => any;
  /** A component that renders the grid root layout. */
  rootComponent: React.ComponentType<Grid.RootProps>;
  rootProps?: Record<any, any>;
}>;

/** @internal */
export type GridCoreGettersProps = Pick<
  GridProps,
  'rows' | 'columns' | 'getRowId' | 'getCellValue'
>;
