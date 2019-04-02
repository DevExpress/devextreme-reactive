import { PureComputed } from '@devexpress/dx-core';
import { GRID_TREE_NODE_TYPE } from './constants';
import {
  RowsWithTreeMetaMap, RowsWithCollapsedRowsMetaMap, IsSpecificTreeRowGetter, GetRowIdFn,
  GetRowLevelKeyFn, GetCollapsedRowsFn, CustomTreeRowsWithMetaComputed, GetCustomTreeRowsFn,
  UnwrapRowsComputed, GetTreeRowLevelGetter, ExpandedTreeRowsFn,
} from '../../types';

const customTreeRows: GetCustomTreeRowsFn = (
  currentRow, getChildRows, rootRows, level = 0,
) => {
  const childRows = getChildRows(currentRow, rootRows as any[]);

  if (!childRows) return { rows: [], treeMeta: [], empty: true };

  return childRows
    .reduce((acc, row) => {
      const nestedResult = customTreeRows(
        row,
        getChildRows,
        rootRows,
        level + 1,
      );
      acc.rows.push(row, ...nestedResult.rows);
      acc.treeMeta.push([row, { level, leaf: !!nestedResult.empty }], ...nestedResult.treeMeta);

      return acc;
    }, { rows: [], treeMeta: [] });
};

export const customTreeRowsWithMeta: CustomTreeRowsWithMetaComputed = (
  rows, getChildRows,
) => {
  const result = customTreeRows(null, getChildRows, rows);

  return {
    rows: result.rows,
    treeMeta: new Map(result.treeMeta),
  };
};

export const customTreeRowIdGetter: PureComputed<[GetRowIdFn, RowsWithTreeMetaMap]> = (
  getRowId, { rows, treeMeta },
) => {
  const firstNestedRowIndex = rows.findIndex(row => treeMeta.get(row)!.level > 0);
  if (firstNestedRowIndex === -1 || getRowId(rows[firstNestedRowIndex]) !== undefined) {
    return getRowId;
  }
  const map = new Map(rows
    .map((row, rowIndex) => [row, rowIndex] as [any, any]));
  return row => map.get(row);
};

export const customTreeRowLevelKeyGetter: PureComputed<
  [GetRowLevelKeyFn, RowsWithTreeMetaMap]
> = (
  getRowLevelKey, { treeMeta },
) => (row) => {
  const rowMeta = treeMeta.get(row);
  if (rowMeta !== undefined) {
    return `${GRID_TREE_NODE_TYPE.toString()}_${rowMeta.level}`;
  }
  return getRowLevelKey && getRowLevelKey();
};

export const expandedTreeRows: ExpandedTreeRowsFn = (
  { rows, treeMeta }, getRowId, expandedRowIds,
) => {
  const expandedRowIdsSet = new Set(expandedRowIds);

  let currentExpanded = true;
  let currentLevel = 0;

  const collapsedRowsMeta = new Map();
  const resultRows: object[] = [];

  rows.forEach((row) => {
    const rowMeta = treeMeta.get(row);
    const level = rowMeta && rowMeta.level;
    if (level === undefined && currentExpanded) {
      resultRows.push(row);
    } else if (!currentExpanded && (level === undefined || level > currentLevel)) {
      const lastRow = resultRows[resultRows.length - 1];
      let collapsedItems = collapsedRowsMeta.get(lastRow);
      if (!collapsedItems) {
        collapsedItems = [];
        collapsedRowsMeta.set(lastRow, collapsedItems);
      }
      collapsedItems.push(row);
    } else {
      currentExpanded = expandedRowIdsSet.has(getRowId(row));
      currentLevel = level!;

      resultRows.push(row);
    }
  });

  return {
    treeMeta,
    collapsedRowsMeta,
    rows: resultRows,
  };
};

export const collapsedTreeRowsGetter: PureComputed<
  [GetCollapsedRowsFn, RowsWithCollapsedRowsMetaMap]
> = (
  getCollapsedRows, { collapsedRowsMeta },
) => row => collapsedRowsMeta.get(row) || (getCollapsedRows && getCollapsedRows(row));

export const isTreeRowLeafGetter: IsSpecificTreeRowGetter = ({ treeMeta }) => (row) => {
  const rowMeta = treeMeta.get(row);
  return rowMeta && rowMeta.leaf;
};

export const getTreeRowLevelGetter: GetTreeRowLevelGetter = ({ treeMeta }) => (row) => {
  const rowMeta = treeMeta.get(row);
  return (rowMeta && rowMeta.level) as number;
};

export const unwrappedCustomTreeRows: UnwrapRowsComputed = ({ rows }) => rows;
