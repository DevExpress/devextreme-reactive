import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { Column, Row, GetCellValueFn } from './grid-core.types';
import { TableColumn, TargetColumnGeometry, GetCellColSpanFn, TableRow } from './table.types';
import { SummaryItem } from '.';

/** Describes grouping options. */
export interface Grouping {
  /** Specifies the name of the column by which the data is grouped. */
  columnName: string;
}
/** Describes a group that can be nested in another one. */
export type GroupKey = string;
/** @internal */
export type GroupIndex = number;

/** Describes the grouping panel item properties. */
export interface GroupingPanelItem {
  /** A column associated with the item. */
  column: Column;
  /** Specifies if the item is in preview mode */
  draft?: boolean;
}

/** @internal */
export type DraftGroupingState = { draftGrouping: Grouping[] };
/** @internal */
export type ColumnGroupingState = { grouping?: Grouping[], expandedGroups?: ReadonlyArray<string> };
/** @internal */

export type ChangeGroupingPayload = { columnName: string, groupIndex: number };
/** @internal */
export type ToggleGroupPayload = { groupKey: GroupKey };

/** @internal */
type ChildGroup = { key: number | string, value?: any, childRows?: any[] };

/** @internal */
export type GetChildGroupsFn = CustomFunction<[Row[], Grouping, Row[]], ChildGroup[]>;

/** @internal */
export type GroupingCriteriaFn = PureComputed<[any, any?], { key: string | number, value?: any }>;

/** @internal */
export type CustomGroupedRowsFn = PureComputed<
  [Row[], Grouping[], GetChildGroupsFn, Row[]?, string?]
>;

/** @internal */
export type GroupingPanelItemsFn = PureComputed<
  [Column[], Grouping[], Grouping[]], GroupingPanelItem[]
>;

/** @internal */
export type GroupedRowsFn = PureComputed<
  [Row[], Grouping[], GetCellValueFn, (c: string) => GroupingCriteriaFn]
>;

/** @internal */
export type GetGroupsFn = PureComputed<
  [Row[], Grouping[], GetCellValueFn, (c: string) => GroupingCriteriaFn, string, number]
>;

/** @internal */
type ShowColumnWhenGroupedFn = (name: string) => boolean;
/** @internal */
export type TableColumnsWithDraftGroupingFn = PureComputed<
  [TableColumn[], Grouping[], Grouping[], ShowColumnWhenGroupedFn]
>;

/** @internal */
export type TableColumnsWithGroupingFn = PureComputed<
  [Column[], TableColumn[], Grouping[], Grouping[], number, ShowColumnWhenGroupedFn], TableColumn[]
>;

/** @internal */
export type GetGroupCellTargetIndexFn = PureComputed<
  [TargetColumnGeometry[], number, { x: number, y: number }],
  number
>;
/** @internal */
export type GroupCellColSpanGetter = PureComputed<
  [GetCellColSpanFn, SummaryItem[], number],
  GetCellColSpanFn
>;

/** @internal */
export type GroupSummaryChainsFn = PureComputed<
  [TableRow, TableColumn[], SummaryItem[], number],
  string[][]
>;
