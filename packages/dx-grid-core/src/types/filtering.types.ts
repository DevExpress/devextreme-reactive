/** Describes a filter. */
import { PureComputed } from '@devexpress/dx-core';
import { Row, GetCellValueFn, GetRowLevelKeyFn, GetCollapsedRowsFn } from './grid-core.types';
import { RowsWithCollapsedRowsMetaMap } from './tree-data.types';

/** Describes a filter. */
export interface Filter {
  /** Specifies the name of a column whose value is used for filtering. */
  columnName: string;
  /** Specifies the operation name. The value is 'contains' if the operation name is not set. */
  operation?: FilterOperation;
  /** Specifies the filter value. */
  value?: any;
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
 * `greaterThan`, `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual` */
export type FilterOperation = string;

/* tslint:disable no-namespace max-line-length */
export namespace IntegratedFiltering {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** A filter predicate. The `filter` parameter accepts an object containing the 'value' field. Note that you can use the onFilter event to extend this object to the fields your filtering algorithm requires. */
    predicate?: (value: any, filter: Filter, row: any) => boolean;
  }
}
/* tslint:enable no-namespace max-line-length */

/** @internal */
export type GetAvailableFilterOperationsFn = PureComputed<[string], FilterOperation[] | undefined>;

/** @internal */
export type FilterPredicate = PureComputed<[any, Filter, Row?], boolean>;

/** @internal */
export type GetColumnPredicateFn = (columnName: string) => FilterPredicate;
/** @internal */
export type CompiledPredicate = (row: any, ...args: any[]) => boolean;

/** @internal */
export type ChangeFilterPayload = { columnName: string, config: object };

/** @internal */
export type FilterHierarchicalRowsFn = PureComputed<
[Row[], CompiledPredicate, GetRowLevelKeyFn, GetCollapsedRowsFn],
Partial<RowsWithCollapsedRowsMetaMap>
>;

/** @internal */
export type FilteredRowsFn = PureComputed<
  [Row[], FilterExpression, GetCellValueFn,
   GetColumnPredicateFn, GetRowLevelKeyFn, GetCollapsedRowsFn
  ],
  Partial<RowsWithCollapsedRowsMetaMap>
>;

/** @internal */
export type FilteredCollapsedRowsGetterFn = PureComputed<
  [RowsWithCollapsedRowsMetaMap],
  (row: Row) => Row[] | undefined
>;

/** @internal */
export type ColumnFilterOperations = {
  [columnName: string]: FilterOperation,
};

/** @internal */
export type FilterConfig = {
  operation?: FilterOperation,
  value?: any,
};

/** @internal */
export type GetSelectedFilterOperationFn = PureComputed<
  [ColumnFilterOperations, string, Filter, FilterOperation[]],
  FilterOperation
>;
