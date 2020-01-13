import { PureComputed } from "@devexpress/dx-core";
import { Row, GetRowIdFn, RowId, TableColumn } from "..";
import { GroupSummaryItem } from "./summary.types";
import { Grouping } from "./grouping.types";
import { Worksheet, Cell } from "exceljs";
import { Column, GetCellValueFn } from "./grid-core.types";

export type FilterSelectedRowsFn = PureComputed<[Row[], GetRowIdFn, RowId[]]>;
export type OutlineLevels = { [groupedBy: string]: number };
export type GroupTree = { [groupKey: string]: Array<string | number> };
export type BuildGroupTreeFn = PureComputed<
  [Row[], OutlineLevels, Grouping[], GroupSummaryItem[], number],
  GroupTree
>;
export type FindRangesFn = PureComputed<
  [GroupTree, string, number, number, Array<number[]>?],
  Array<number[]>
>;

type OpenedGroup = { groupedBy: string, compoundKey: string };
type CloseGroupFn = (group: OpenedGroup) => void;
export type CustomizeCellFn = (cell: Cell, row: Row, column: Column) => void;
export type ExportRowsFn = (
  worksheet: Worksheet, rows: Row[], dataColumns: Column[], columns: TableColumn[],
  outlineLevels: OutlineLevels, getCellValue: GetCellValueFn,
  closeGroup: CloseGroupFn, customizeCell: CustomizeCellFn
) => void;
