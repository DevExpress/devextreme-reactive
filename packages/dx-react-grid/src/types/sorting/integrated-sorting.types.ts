// tslint:disable-next-line: no-namespace
export namespace IntegratedSorting {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** A sort compare function. See the Sorting guide for more information. */
    compare?: (a: any, b: any) => number;
  }
}

export interface IntegratedSortingProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<IntegratedSorting.ColumnExtension>;
}
