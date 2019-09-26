import {
  GetRowLevelKeyFn, IsSpecificRowFn, GetCollapsedRowsFn, GetRowIdFn, Row, GetCellValueFn,
} from './grid-core.types';
import { TableRow } from './table.types';
import { PureComputed, CustomFunction } from '@devexpress/dx-core';

/** Describes the summary item associated with a column. */
export interface SummaryItem {
  /** The name of a column associated with the current summary item. */
  columnName: string;
  /** A summary type. */
  type: SummaryType;
}
export type SummaryType = string;

/** @internal */
export type RowLevel = { levelKey: string, row: Row, opened: boolean };

/** @internal */
export type GroupLevel = { levelKey: string, row: Row, rows: Row[] };

/** @internal */
type GetRowValueFn = PureComputed<[Row], any>;
/** @internal */
export type ColumnSummary = { type: SummaryType, value: SummaryValue };
/** @internal */
export type GetColumnSummariesFn = PureComputed<
  [SummaryItem[], string, SummaryValue[]],
  ColumnSummary[]
>;

/** @internal */
export type TableRowsWithSummariesFn = PureComputed<
  [TableRow[], SummaryItem[], SummaryItem[], GetRowLevelKeyFn, IsSpecificRowFn, GetRowIdFn]
>;

/** @internal */
type DefaultSummaryCalulator = PureComputed<[Row[], GetRowValueFn], SummaryValue>;
/** @internal */
export type DefaultSummaryCalculators = { [key: string]: DefaultSummaryCalulator };
/** @internal */
export type SummaryValue = number | null;
/** @internal */
type GroupSummaryValue = { [key: string]: SummaryValue[] };
/** @internal */
type TreeSummaryValue = { [key: number]: SummaryValue[] };

/** @internal */
export type SummaryCalculator = CustomFunction<
  [SummaryType, Row[], GetRowValueFn], SummaryValue
>;

/** @internal */
export type RowsSummaryValuesFn = PureComputed<
  [TableRow[], SummaryItem[], GetCellValueFn, SummaryCalculator], SummaryValue[]
>;

/** @internal */
export type TotalSummaryValuesFn = PureComputed<[
  TableRow[], SummaryItem[], GetCellValueFn, GetRowLevelKeyFn,
  IsSpecificRowFn, GetCollapsedRowsFn, SummaryCalculator?
], SummaryValue[]>;

/** @internal */
export type GroupSummaryValuesFn = PureComputed<[
  TableRow[], SummaryItem[], GetCellValueFn, GetRowLevelKeyFn,
  IsSpecificRowFn, GetCollapsedRowsFn, SummaryCalculator?
], GroupSummaryValue>;

/** @internal */
export type TreeSummaryValuesFn = PureComputed<[
  TableRow[], SummaryItem[], GetCellValueFn, GetRowLevelKeyFn,
  IsSpecificRowFn, GetRowIdFn, SummaryCalculator?
], TreeSummaryValue>;
