import * as React from 'react';

export interface IntegratedSortingColumnExtension {
  /** The name of a column to extend. */
  columnName: string;
  /** A sort compare function. See the [Sorting guide](../guides/sorting.md#custom-sorting-algorithm) for more information. */
  compare?: (a: any, b: any) => number;
}

export interface IntegratedSortingProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions: Array<IntegratedSortingColumnExtension>;
}

export declare const IntegratedSorting: React.ComponentType<IntegratedSortingProps>;
