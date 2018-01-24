import * as React from 'react';

export interface Sorting {
  /** Specifies a column's name to which the sorting is applied. */
  columnName: string;
  /** Specifies a column's sort order. */
  direction: 'asc' | 'desc';
}

export interface SortingStateProps {
  /** Specifies the applied sorting. */
  sorting: Array<Sorting>;
  /** Specifies initial sorting in the uncontrolled mode. */
  defaultSorting: Array<Sorting>;
  /** Handles sorting changes. */
  onSortingChange: (sorting: Array<Sorting>) => void;
}

export declare const SortingState: React.ComponentType<SortingStateProps>;
