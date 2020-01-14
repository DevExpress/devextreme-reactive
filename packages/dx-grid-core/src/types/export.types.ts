import { PureComputed, ReadonlyObject } from "@devexpress/dx-core";
import { Row, GetRowIdFn, RowId, TableColumn } from "..";
import { GroupSummaryItem, SummaryType, SummaryItem } from "./summary.types";
import { Grouping } from "./grouping.types";
import { Worksheet, Cell } from "exceljs";
import { Column, GetCellValueFn, IsSpecificRowFn, GetCollapsedRowsFn } from "./grid-core.types";

export type FilterSelectedRowsFn = PureComputed<[Row[], GetRowIdFn, RowId[]]>;
export type OutlineLevels = { [groupedBy: string]: number };
export type GroupTree = { [groupKey: string]: Array<string | number> };
export type BuildGroupTreeFn = PureComputed<
  [Row[], OutlineLevels, Grouping[], IsSpecificRowFn, GroupSummaryItem[], number],
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

export type GetOutlineLevelsFn = PureComputed<[Grouping[]?], OutlineLevels>;
export type CustomizeCellFn = (cell: Cell, row: Row, column: Column) => void;
export type CustomizeSummaryCellFn = (cell: Cell, column: Column, summary: ExportSummary) => void;
export type GetRowsToExportFn = PureComputed<[Row[], RowId[], GetCollapsedRowsFn, GetRowIdFn]>;
export type ExportRowsFn = (
  worksheet: Worksheet, rows: ReadonlyArray<Row>, dataColumns: Column[], columns: TableColumn[],
  outlineLevels: OutlineLevels, getCellValue: GetCellValueFn,
  closeGroup: CloseGroupFn, customizeCell: CustomizeCellFn
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
) => CloseGroupFn;
export type CloseSheetFn = (
  sheet: Worksheet, groupTree: ReadonlyObject<GroupTree>, maxLevel: number,
  totalSummaryItems: SummaryItem[], exportSummary: ExportSummaryFn,
) => void;
