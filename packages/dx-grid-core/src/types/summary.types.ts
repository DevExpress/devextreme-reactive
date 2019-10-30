import {
  GetRowLevelKeyFn, IsSpecificRowFn, GetCollapsedRowsFn, GetRowIdFn, Row, GetCellValueFn, Column,
} from './grid-core.types';
import { TableRow, TableColumn } from './table.types';
import { PureComputed, CustomFunction } from '@devexpress/dx-core';

/** Describes the summary item associated with a column. */
export interface SummaryItem {
  /** The name of a column associated with the current summary item. */
  columnName: string;
  /** A summary type. */
  type: SummaryType;
}
export interface GroupSummaryItem extends SummaryItem {
  showInGroupRow: boolean;
  showInGroupCaption: boolean;
}
export type SummaryType = string;

/** @internal */
export type RowLevel = { levelKey: string, row: Row, opened: boolean };

/** @internal */
export type GroupLevel = { levelKey: string, row: Row, rows: Row[] };

/** @internal */
type GetRowValueFn = PureComputed<[Row], any>;

export type ColumnSummary = { type: SummaryType, value: SummaryValue };
/** @internal */
export type GetColumnSummariesFn = PureComputed<
  [SummaryItem[], string, SummaryValue[], ((item: SummaryItem) => boolean)?],
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

export type SummaryValue = number | null;
/** @internal */
export type GroupSummaryValue = { [key: string]: SummaryValue[] };
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

/** @internal */
export type ExpandRowsFn = PureComputed<
  [TableRow[], GetRowLevelKeyFn, GetCollapsedRowsFn, IsSpecificRowFn, boolean?],
  TableRow[]
>;

/** @internal */
export type ColumnInlineSummaries = {
  column: Column,
  summaries: ReadonlyArray<ColumnSummary>,
};

/** @internal */
export type GetGroupInlineSummariesFn = PureComputed<
  [GroupSummaryItem[], TableColumn[], SummaryValue[]], ColumnInlineSummaries[]
>;
