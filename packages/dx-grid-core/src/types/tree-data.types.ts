import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { Row, GetRowIdFn, RowId, IsSpecificRowFn, GetRowLevelKeyFn } from './grid-core.types';
import { NODE_CHECK } from '../utils/hierarchical-data';
import { TableRow } from './table.types';

/** @internal */
export type GetTreeChildRowsFn = CustomFunction<[Row | null, Row[]], Row[] | null>;

/** @internal */
export type TreeMeta = { level: number, leaf: boolean };
/** @internal */
export type TreeNode = {
  [NODE_CHECK]?: true;
  root?: Row;
  children: TreeNode[];
};

/** @internal */
// tslint:disable-next-line:prefer-array-literal
export type RowsWithTreeMeta = { rows: Row[], treeMeta: Array<[Row, TreeMeta]>, empty?: boolean };
/** @internal */
export type RowsWithTreeMetaMap = { rows: Row[], treeMeta: Map<Row, TreeMeta> };
/** @internal */
export type RowsWithCollapsedRowsMetaMap = RowsWithTreeMetaMap
  & { collapsedRowsMeta: Map<Row, Row[]> };

  /** @internal */
export type ExpandedTreeRowsComputed = PureComputed<
  [RowsWithTreeMetaMap, GetRowIdFn, RowId[]],
  RowsWithCollapsedRowsMetaMap
>;

/** @internal */
export type CustomTreeRowsWithMetaComputed = PureComputed<
  [Row[], GetTreeChildRowsFn], RowsWithTreeMetaMap
>;

/** @internal */
export type TreeRowLevelGetter = PureComputed<[Row], number>;
/** @internal */
export type GetTreeRowLevelGetter = PureComputed<[RowsWithTreeMetaMap], TreeRowLevelGetter>;
/** @internal */
export type IsSpecificTreeRowGetter = PureComputed<[RowsWithTreeMetaMap], IsSpecificRowFn>;
/** @internal */
export type ExpandedTreeRowsFn = PureComputed<
  [RowsWithTreeMetaMap, GetRowIdFn, RowId[]], RowsWithCollapsedRowsMetaMap
>;

/** @internal */
export type RowsToTreeFn = PureComputed<[TableRow[], GetRowLevelKeyFn], TreeNode[]>;
/** @internal */
export type TreeToRowsFn = PureComputed<[TreeNode[], TreeNode[]?]>;
