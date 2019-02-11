import {
  GetRowLevelKeyFn, IsSpecificRowFn, GetCollapsedRowsFn, GetRowIdFn, Row, GetCellValueFn,
} from './grid-core.types';
import { TableRow } from './table.types';
import { PureComputed, CustomFunction } from '@devexpress/dx-core';

export interface SummaryItem {
  /** The name of a column associated with the current summary item. */
  columnName: string;
  /** A summary type. */
  type: SummaryType;
}
export type SummaryType = string;

export type RowLevel = { levelKey: string, row: Row, opened: boolean };

type GetRowValueFn = PureComputed<[Row], any>;
export type ColumnSummary = { type: SummaryType, value: SummaryValue };
export type GetColumnSummariesFn = PureComputed<
  [SummaryItem[], string, SummaryValue[]],
  ColumnSummary[]
>;

export type TableRowsWithSummariesFn = PureComputed<
  [TableRow[], GetRowLevelKeyFn, IsSpecificRowFn, GetRowIdFn]
>;

type DefaultSummaryCalulator = PureComputed<[Row[], GetRowValueFn], SummaryValue>;
export type DefaultSummaryCalculators = { [key: string]: DefaultSummaryCalulator };
export type SummaryValue = number | null;
type GroupSummaryValue = { [key: string]: SummaryValue[] };
type TreeSummaryValue = { [key: number]: SummaryValue[] };

export type SummaryCalculator = CustomFunction<
  [SummaryType, Row[], GetRowValueFn], SummaryValue
>;

export type RowsSummaryValuesFn = PureComputed<
  [TableRow[], SummaryItem[], GetCellValueFn, SummaryCalculator], SummaryValue[]
>;

export type TotalSummaryValuesFn = PureComputed<[
  TableRow[], SummaryItem[], GetCellValueFn, GetRowLevelKeyFn,
  IsSpecificRowFn, GetCollapsedRowsFn, SummaryCalculator?
], SummaryValue[]>;

export type GroupSummaryValuesFn = PureComputed<[
  TableRow[], SummaryItem[], GetCellValueFn, GetRowLevelKeyFn,
  IsSpecificRowFn, SummaryCalculator?
], GroupSummaryValue>;

export type TreeSummaryValuesFn = PureComputed<[
  TableRow[], SummaryItem[], GetCellValueFn, GetRowLevelKeyFn,
  IsSpecificRowFn, GetRowIdFn, SummaryCalculator?
], TreeSummaryValue>;
