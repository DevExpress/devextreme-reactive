import { PureComputed } from "@devexpress/dx-core";
import { Row, GetRowIdFn, RowId } from "..";

export type FilterSelectedRowsFn = PureComputed<[Row[], GetRowIdFn, RowId[]]>;
export type OutlineLevels = { [groupedBy: string]: number };
export type GroupTree = { [groupKey: string]: Array<string | number> };
export type BuildGroupTreeFn = PureComputed<[Row[], OutlineLevels, number], GroupTree>;
export type FindRangesFn = PureComputed<
  [GroupTree, string, number, number, Array<number[]>],
  Array<number[]>
>;
