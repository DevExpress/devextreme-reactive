import { PureComputed } from "@devexpress/dx-core";
import { Row, GetRowIdFn, RowId } from "..";
import { GroupSummaryItem } from "./summary.types";
import { Grouping } from "./grouping.types";

export type FilterSelectedRowsFn = PureComputed<[Row[], GetRowIdFn, RowId[]]>;
export type OutlineLevels = { [groupedBy: string]: number };
export type GroupTree = { [groupKey: string]: Array<string | number> };
export type BuildGroupTreeFn = PureComputed<
  [Row[], OutlineLevels, Grouping[], GroupSummaryItem[], number],
  GroupTree
>;
export type FindRangesFn = PureComputed<
  [GroupTree, string, number, number, Array<number[]>],
  Array<number[]>
>;
