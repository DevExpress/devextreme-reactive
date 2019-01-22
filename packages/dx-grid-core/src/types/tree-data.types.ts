import { PureComputed } from '@devexpress/dx-core';
import { Row, GetRowIdFn, RowId, IsSpecificRowFn, GetRowLevelKeyFn } from './grid-core.types';
import { NODE_CHECK } from '../utils/hierarchical-data';
import { TableRow } from './table.types';

export type GetTreeChildRowsFn = PureComputed<[Row | null, Row[]], Row[] | null>;

export type TreeMeta = { level: number, leaf: boolean };
export type TreeNode = {
  [NODE_CHECK]?: true;
  root?: Row;
  children: TreeNode[];
};

// tslint:disable-next-line:prefer-array-literal
export type RowsWithTreeMeta = { rows: Row[], treeMeta: Array<[Row, TreeMeta]>, empty?: boolean };
export type RowsWithTreeMetaMap = { rows: Row[], treeMeta: Map<Row, TreeMeta> };
export type RowsWithCollapsedRowsMetaMap = RowsWithTreeMetaMap
  & { collapsedRowsMeta: Map<Row, Row[]> };

export type ExpandedTreeRowsComputed = PureComputed<
  [RowsWithTreeMetaMap, GetRowIdFn, RowId[]],
  RowsWithCollapsedRowsMetaMap
>;

export type GetCustomTreeRowsFn = PureComputed<
  [Row, GetTreeChildRowsFn, Row[], number?],
  RowsWithTreeMeta
>;
export type CustomTreeRowsWithMetaComputed = PureComputed<
  [Row[], GetTreeChildRowsFn], RowsWithTreeMetaMap
>;

export type TreeRowLevelGetter = PureComputed<[Row], number>;
export type GetTreeRowLevelGetter = PureComputed<[RowsWithTreeMetaMap], TreeRowLevelGetter>;
export type IsSpecificTreeRowGetter = PureComputed<[RowsWithTreeMetaMap], IsSpecificRowFn>;
export type ExpandedTreeRowsFn = PureComputed<
  [RowsWithTreeMetaMap, GetRowIdFn, RowId[]], RowsWithCollapsedRowsMetaMap
>;

export type RowsToTreeFn = PureComputed<[TableRow[], GetRowLevelKeyFn], TreeNode[]>;
export type TreeToRowsFn = PureComputed<[TreeNode[], TreeNode[]?]>;
