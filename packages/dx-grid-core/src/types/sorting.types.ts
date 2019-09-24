import { PureComputed } from '@devexpress/dx-core';
import { GridColumnExtension } from './table.types';
import { Row, GetCellValueFn, IsSpecificRowFn, GetRowLevelKeyFn } from './grid-core.types';
import { CompareFn } from './merge-sort.types';

export type SortingDirection = 'asc' | 'desc';
/** Describes the sorting applied to a column */
export interface Sorting {
  /** Specifies a column's name to which the sorting is applied. */
  columnName: string;
  /** Specifies a column's sorting order. */
  direction: SortingDirection;
}

/** @internal */
export type SortingColumnExtension = GridColumnExtension & { sortingEnabled?: boolean };
/** @internal */
export type ColumnSortingState = { sorting: Sorting[] };
/** @internal */
export type KeepOtherSorting = boolean | string[];
/** @internal */
export type ChangeSortingPayload = {
  columnName: string;
  direction?: string;
  keepOther?: KeepOtherSorting;
  sortIndex?: number | undefined;
};

/** @internal */
type GetColumnCompareFn = (name: string) => (a: any, b: any) => number;
/** @internal */
export type CreateCompareFn = PureComputed<
  [Sorting[], GetColumnCompareFn | undefined, (...args: [Row, string]) => any],
  CompareFn
>;

/** @internal */
export type SortedRowsFn = PureComputed<
  [Row[], Sorting[], GetCellValueFn, GetColumnCompareFn?, IsSpecificRowFn?, GetRowLevelKeyFn?]
>;

/** @internal */
export type GetColumnSortingDirectionFn = PureComputed<
  [Sorting[], string],
  SortingDirection | null
>;

/** @internal */
export type GetPersistentSortedColumnsFn = PureComputed<
  [Sorting[], SortingColumnExtension[]?],
  string[]
>;

/** @internal */
export type CalculateKeepOtherFn = PureComputed<
  [Sorting[], KeepOtherSorting, string[]],
  KeepOtherSorting
>;
