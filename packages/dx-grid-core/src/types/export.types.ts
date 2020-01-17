import { PureComputed, ReadonlyObject } from "@devexpress/dx-core";
import { Row, GetRowIdFn, RowId, TableColumn } from "..";
import { GroupSummaryItem, SummaryType, SummaryItem } from "./summary.types";
import { Grouping } from "./grouping.types";
import { Worksheet, Cell } from "exceljs";
import { Column, GetCellValueFn, IsSpecificRowFn, GetCollapsedRowsFn } from "./grid-core.types";

export type FilterSelectedRowsFn = PureComputed<[Row[], RowId[], GetRowIdFn, IsSpecificRowFn]>;
export type OutlineLevels = { [groupedBy: string]: number };
export type GroupTree = { [groupKey: string]: Array<string | number> };
export type BuildGroupTreeFn = PureComputed<
  [Row[], OutlineLevels, Grouping[], IsSpecificRowFn, GroupSummaryItem[]],
  GroupTree
>;
export type FindRangesFn = PureComputed<
  [GroupTree, string, number, number, Array<number[]>?],
  ExportRanges
>;

type OpenedGroup = { groupedBy: string, compoundKey: string };
type CloseGroupFn = (group: OpenedGroup) => void;
type ExportRanges = readonly number[][];
type ExportSummary = { type: SummaryType, ranges: ExportRanges };

export type OutlineLevelsFn = PureComputed<[Grouping[]], OutlineLevels>;
export type CustomizeCellFn = (cell: Cell, row: Row, column: Column) => void;
export type CustomizeSummaryCellFn = (cell: Cell, column: Column, summary: ExportSummary) => void;
export type GetRowsToExportFn = PureComputed<
  [Row[], RowId[], Grouping[], GetCollapsedRowsFn, GetRowIdFn, IsSpecificRowFn]
>;
export type RemoveEmptyGroupsFn = PureComputed<[Row[], Grouping[], IsSpecificRowFn]>;
export type ExportRowsFn = (
  worksheet: Worksheet, rows: ReadonlyArray<Row>, dataColumns: Column[], columns: TableColumn[],
  isGroupRow: IsSpecificRowFn, outlineLevels: OutlineLevels, rowsOffset: number, 
  getCellValue: GetCellValueFn, getCloseGroup: (offset: number) => CloseGroupFn,
  customizeCell: CustomizeCellFn
) => void;
export type ExportSummaryFn = (
  item: SummaryItem, ranges: ExportRanges,
) => void;
export type GetExportSummaryFn = (
  sheet: Worksheet, dataColumns: Column[],
  customizeSummaryCell: CustomizeSummaryCellFn, summaryMessages: { [key: string]: string },
) => ExportSummaryFn;
export type GetCloseGroupFn = (
  sheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, outlineLevels: OutlineLevels, maxLevel: number,
  groupSummaryItems: GroupSummaryItem[], exportSummary: ExportSummaryFn,
) => (rowsOffset: number) => CloseGroupFn;
export type CloseSheetFn = (
  sheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, maxLevel: number,
  rowsOffset: number, totalSummaryItems: SummaryItem[], exportSummary: ExportSummaryFn,
) => void;
export type ExportSummaryItemsFn = (
  worksheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, summaryItems: SummaryItem[],
  groupKey: string, groupLevel: number, rowsOffset: number, maxLevel: number,
  exportSummary: ExportSummaryFn,
) => void;
