import { PureComputed } from '@devexpress/dx-core';
import { GridColumnExtension } from './table.types';
import { Row, GetCellValueFn, IsSpecificRowFn, GetRowLevelKeyFn } from './grid-core.types';
import { CompareFn } from './merge-sort.types';

/** Describes the sorting applied to a column */
export interface Sorting {
  /** Specifies a column's name to which the sorting is applied. */
  columnName: string;
  /** Specifies a column's sorting order. */
  direction: 'asc' | 'desc';
}

export type SortingDirection = 'asc' | 'desc';
export type SortingColumnExtension = GridColumnExtension & { sortingEnabled?: boolean };
export type ColumnSortingState = { sorting: Sorting[] };
export type KeepOtherSorting = boolean | string[];
export type ChangeSortingPayload = {
  columnName: string;
  direction?: string;
  keepOther?: KeepOtherSorting;
  sortIndex?: number | undefined;
};

type GetColumnCompareFn = (name: string) => (a: any, b: any) => number;
export type CreateCompareFn = PureComputed<
  [Sorting[], GetColumnCompareFn | undefined, (...args: [Row, string]) => any],
  CompareFn
>;

export type SortedRowsFn = PureComputed<
  [Row[], Sorting[], GetCellValueFn, GetColumnCompareFn?, IsSpecificRowFn?, GetRowLevelKeyFn?]
>;

export type GetColumnSortingDirectionFn = PureComputed<
  [Sorting[], string],
  SortingDirection | null
>;

export type GetPersistentSortedColumnsFn = PureComputed<
  [Sorting[], SortingColumnExtension[]?],
  string[]
>;

export type CalculateKeepOtherFn = PureComputed<
  [Sorting[], KeepOtherSorting, string[]],
  KeepOtherSorting
>;
