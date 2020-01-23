import { PureComputed, ReadonlyObject } from '@devexpress/dx-core';
import { Row, GetRowIdFn, RowId, TableColumn } from '..';
import { GroupSummaryItem, SummaryType, SummaryItem } from './summary.types';
import { Grouping } from './grouping.types';
/** @internal */
import { Worksheet, Cell } from 'exceljs';
import { Column, GetCellValueFn, IsSpecificRowFn, GetCollapsedRowsFn } from './grid-core.types';

/** @internal */
export type FilterSelectedRowsFn = PureComputed<
  [Row[], RowId[], GetRowIdFn, IsSpecificRowFn | undefined]
>;
/** @internal */
export type OutlineLevels = { [groupedBy: string]: number };
/** @internal */
export type GroupTree = { [groupKey: string]: Array<string | number> };
/** @internal */
export type BuildGroupTreeFn = PureComputed<
  [Row[], OutlineLevels, Grouping[], IsSpecificRowFn, GroupSummaryItem[]],
  GroupTree
>;
/** @internal */
export type FindRangesFn = PureComputed<
  [GroupTree, string, number, number, Array<number[]>?],
  ExportRanges
>;

type OpenedGroup = { groupedBy: string, compoundKey: string };
type CloseGroupFn = (group: OpenedGroup) => void;

export type ExportRanges = readonly number[][];
export type ExportSummary = { type: SummaryType, ranges: ExportRanges };

export type CustomizeCellFn = (cell: Cell, row: Row, column: Column) => void;
export type CustomizeSummaryCellFn = (cell: Cell, column: Column, summary: ExportSummary) => void;

/** @internal */
export type OutlineLevelsFn = PureComputed<[Grouping[]], OutlineLevels>;

/** @internal */
export type GetRowsToExportFn = PureComputed<
  [Row[], RowId[], Grouping[], GetCollapsedRowsFn, GetRowIdFn, IsSpecificRowFn]
>;
/** @internal */
export type RemoveEmptyGroupsFn = PureComputed<[Row[], Grouping[], IsSpecificRowFn]>;

/** @internal */
export type ExportRowsFn = (
  worksheet: Worksheet, rows: ReadonlyArray<Row>, dataColumns: Column[], columns: TableColumn[],
  isGroupRow: IsSpecificRowFn | undefined, outlineLevels: OutlineLevels, rowsOffset: number,
  getCellValue: GetCellValueFn, getCloseGroup: (offset: number) => CloseGroupFn,
  customizeCell: CustomizeCellFn,
) => void;

/** @internal */
export type ExportSummaryFn = (
  item: SummaryItem, ranges: ExportRanges,
) => void;

/** @internal */
export type GetExportSummaryFn = (
  sheet: Worksheet, dataColumns: Column[],
  customizeSummaryCell: CustomizeSummaryCellFn, summaryMessages: { [key: string]: string },
) => ExportSummaryFn;

/** @internal */
export type GetCloseGroupFn = (
  sheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, outlineLevels: OutlineLevels,
  maxLevel: number, groupSummaryItems: GroupSummaryItem[], exportSummary: ExportSummaryFn,
) => (rowsOffset: number) => CloseGroupFn;

/** @internal */
export type CloseSheetFn = (
  sheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, maxLevel: number,
  rowsOffset: number, totalSummaryItems: SummaryItem[], exportSummary: ExportSummaryFn,
) => void;

/** @internal */
export type ExportSummaryItemsFn = (
  worksheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, summaryItems: SummaryItem[],
  groupKey: string, groupLevel: number, rowsOffset: number, maxLevel: number,
  exportSummary: ExportSummaryFn,
) => void;
