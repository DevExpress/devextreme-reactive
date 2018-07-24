import { GRID_TREE_NODE_TYPE } from './constants';

const customTreeRows = (
  currentRow,
  getChildRows,
  rootRows,
  level = 0,
) => {
  const childRows = getChildRows(currentRow, rootRows);

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

export const customTreeRowsWithMeta = (
  rows,
  getChildRows,
) => {
  const result = customTreeRows(null, getChildRows, rows);

  return {
    rows: result.rows,
    treeMeta: new Map(result.treeMeta),
  };
};

export const customTreeRowIdGetter = (getRowId, { rows, treeMeta }) => {
  const firstNestedRowIndex = rows.findIndex(row => treeMeta.get(row).level > 0);
  if (firstNestedRowIndex === -1 || getRowId(rows[firstNestedRowIndex]) !== undefined) {
    return getRowId;
  }
  const map = new Map(rows
    .map((row, rowIndex) => [row, rowIndex]));
  return row => map.get(row);
};

export const customTreeRowLevelKeyGetter = (getRowLevelKey, { treeMeta }) => (row) => {
  const rowMeta = treeMeta.get(row);
  if (rowMeta !== undefined) {
    return `${GRID_TREE_NODE_TYPE}_${rowMeta.level}`;
  }
  return getRowLevelKey && getRowLevelKey();
};

export const expandedTreeRows = ({ rows, treeMeta }, getRowId, expandedRowIds) => {
  const expandedRowIdsSet = new Set(expandedRowIds);

  let currentExpanded = true;
  let currentLevel = 0;
  return rows.reduce((acc, row) => {
    const rowMeta = treeMeta.get(row);
    const level = rowMeta && rowMeta.level;
    if (level === undefined && currentExpanded) {
      acc.rows.push(row);
      return acc;
    }

    if (!currentExpanded && (level === undefined || level > currentLevel)) {
      const lastRow = acc.rows[acc.rows.length - 1];
      let collapsedItems = acc.collapsedRowsMeta.get(lastRow);
      if (!collapsedItems) {
        collapsedItems = [];
        acc.collapsedRowsMeta.set(lastRow, collapsedItems);
      }
      collapsedItems.push(row);
      return acc;
    }

    currentExpanded = expandedRowIdsSet.has(getRowId(row));
    currentLevel = level;

    acc.rows.push(row);

    return acc;
  }, { rows: [], treeMeta, collapsedRowsMeta: new Map() });
};

export const collapsedTreeRowsGetter = (
  getCollapsedRows, { collapsedRowsMeta },
) => row => collapsedRowsMeta.get(row) || (getCollapsedRows && getCollapsedRows(row));

export const isTreeRowLeafGetter = ({ treeMeta }) => (row) => {
  const rowMeta = treeMeta.get(row);
  return rowMeta && rowMeta.leaf;
};

export const getTreeRowLevelGetter = ({ treeMeta }) => (row) => {
  const rowMeta = treeMeta.get(row);
  return rowMeta && rowMeta.level;
};

export const unwrappedCustomTreeRows = ({ rows }) => rows;
