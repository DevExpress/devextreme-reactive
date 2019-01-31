/** Describes a filter. */
import { PureComputed } from '@devexpress/dx-core';
import { Row, GetCellValueFn, GetRowLevelKeyFn, GetCollapsedRowsFn } from './grid-core.types';
import { RowsWithCollapsedRowsMetaMap } from './tree-data.types';
export interface Filter {
  /** Specifies the name of a column whose value is used for filtering. */
  columnName: string;
  /** Specifies the operation name. The value is 'contains' if the operation name is not set. */
  operation?: FilterOperation;
  /** Specifies the filter value. */
  value?: string;
}

/** Describes data filtering expressions */
export interface FilterExpression {
  /** Specifies the Boolean operator */
  operator: 'and' | 'or';
  /** Specifies filters or filter expressions */
  // tslint:disable-next-line:prefer-array-literal
  filters: Array<FilterExpression | Filter>;
}

/*** Describes a filter operation. Accepts one of the built-in operations or a custom string.
 * Built-in operations: `contains`, `notContains`, `startsWith`, `endsWith`, `equal`, `notEqual`,
 * `greaterThan`, `graterThenOrEqual`, `lessThan`, `lessThanOrEqual` */
export type FilterOperation = string;
export type GetAvailableFilterOperationsFn = PureComputed<[string], FilterOperation[] | undefined>;

export type FilterPredicate = PureComputed<[any, Filter, Row?], boolean>;

export type GetColumnPredicateFn = (columnName: string) => FilterPredicate;
export type CompiledPredicate = (row: any, ...args: any[]) => boolean;

export type ChangeFilterPayload = { columnName: string, config: object };

export type FilterHierarchicalRowsFn = PureComputed<
[Row[], CompiledPredicate, GetRowLevelKeyFn, GetCollapsedRowsFn],
Partial<RowsWithCollapsedRowsMetaMap>
>;

export type FilteredRowsFn = PureComputed<
  [Row[], FilterExpression, GetCellValueFn,
   GetColumnPredicateFn, GetRowLevelKeyFn, GetCollapsedRowsFn
  ],
  Partial<RowsWithCollapsedRowsMetaMap>
>;

export type FilteredCollapsedRowsGetterFn = PureComputed<
  [RowsWithCollapsedRowsMetaMap],
  (row: Row) => Row[] | undefined
>;

export type ColumnFilterOperations = {
  [columnName: string]: FilterOperation,
};

export type FilterConfig = {
  operation?: FilterOperation,
  value?: any,
};

export type GetSelectedFilterOperationFn = PureComputed<
  [ColumnFilterOperations, string, Filter, FilterOperation[]],
  FilterOperation
>;
