import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { Column, Row, GetCellValueFn } from './grid-core.types';
import { TableColumn, TargetColumnGeometry } from './table.types';

/** Describes grouping options. */
export interface Grouping {
  /** Specifies the name of the column by which the data is grouped. */
  columnName: string;
}
/** Describes a group that can be nested in another one. */
export type GroupKey = string;
export type GroupIndex = number;

export type GroupingPanelItem = { column: Column, draft: boolean };

export type DraftGroupingState = { draftGrouping: Grouping[] };
export type ColumnGroupingState = { grouping?: Grouping[], expandedGroups?: ReadonlyArray<string> };
export type ChangeGroupingPayload = { columnName: string, groupIndex: number };
export type ToggleGroupPayload = { groupKey: GroupKey };

type ChildGroup = { key: number | string, value?: any, childRows?: any[] };

export type GetChildGroupsFn = CustomFunction<[Row[], Grouping, Row[]], ChildGroup[]>;

export type GroupingCriteriaFn = PureComputed<[any, any?], { key: string | number, value?: any }>;

export type CustomGroupedRowsFn = PureComputed<
  [Row[], Grouping[], GetChildGroupsFn, Row[]?, string?]
>;

export type GroupingPanelItemsFn = PureComputed<
  [Column[], Grouping[], Grouping[]], GroupingPanelItem[]
>;

export type GroupedRowsFn = PureComputed<
  [Row[], Grouping[], GetCellValueFn, (c: string) => GroupingCriteriaFn, string?]
>;

type ShowColumnWhenGroupedFn = (name: string) => boolean;
export type TableColumnsWithDraftGroupingFn = PureComputed<
  [TableColumn[], Grouping[], Grouping[], ShowColumnWhenGroupedFn]
>;

export type TableColumnsWithGroupingFn = PureComputed<
  [Column[], TableColumn[], Grouping[], Grouping[], number, ShowColumnWhenGroupedFn], TableColumn[]
>;

export type GetGroupCellTargetIndexFn = PureComputed<
  [TargetColumnGeometry[], number, { x: number, y: number }],
  number
>;
