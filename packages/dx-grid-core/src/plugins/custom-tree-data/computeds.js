import { GRID_TREE_NODE_TYPE } from './constants';

const customTreeRows = (
  currentRows,
  getChildRows,
  rootRows = currentRows,
  level = 0,
) => {
  if (!currentRows || !currentRows.length) return { rows: [], levelsMeta: [] };

  let isLastLevel = true;
  return getChildRows(currentRows, rootRows)
    .reduce((acc, { row, childRows }) => {
      acc.rows.push(row);
      if (!isLastLevel) {
        acc.levelsMeta.push([row, level]);
      }

      const nestedResult = customTreeRows(
        childRows,
        getChildRows,
        rootRows,
        level + 1,
      );
      if (nestedResult.rows.length) {
        if (isLastLevel) {
          isLastLevel = false;
          acc.levelsMeta.push(...acc.rows.map(r => [r, level]));
        }
        acc.rows.push(...nestedResult.rows);
        acc.levelsMeta.push(...nestedResult.levelsMeta);
        acc.leafsMeta.push(...nestedResult.leafsMeta);
      }
      if (childRows) {
        acc.leafsMeta.push([row, false]);
      }

      return acc;
    }, { rows: [], levelsMeta: [], leafsMeta: [] });
};

export const customTreeRowsWithMeta = (
  currentRows,
  getChildRows,
) => {
  const result = customTreeRows(currentRows, getChildRows);

  return {
    rows: result.rows,
    levelsMeta: new Map(result.levelsMeta),
    leafsMeta: new Map(result.leafsMeta),
  };
};

export const customTreeRowIdGetter = (getRowId, { rows }) => {
  // TODO: filter group rows
  if (rows.length && getRowId(rows[0]) !== undefined) {
    return getRowId;
  }
  const map = new Map(rows
    .map((row, rowIndex) => [row, rowIndex]));
  return row => map.get(row);
};

export const customTreeRowLevelKeyGetter = (getRowLevelKey, { levelsMeta }) =>
  (row) => {
    const level = levelsMeta.get(row);
    if (level !== undefined) {
      return `${GRID_TREE_NODE_TYPE}_${level}`;
    }
    return getRowLevelKey && getRowLevelKey();
  };

export const expandedTreeRows = ({ rows, levelsMeta }, getRowId, expandedRowIds) => {
  const expandedRowIdsSet = new Set(expandedRowIds);

  let currentExpanded = true;
  let currentLevel = 0;
  return rows.reduce((acc, row) => {
    const level = levelsMeta.get(row);
    if (level === undefined && currentExpanded) {
      acc.rows.push(row);
      return acc;
    }

    if ((level === undefined && !currentExpanded) || (level > currentLevel && !currentExpanded)) {
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
  }, { rows: [], levelsMeta, collapsedRowsMeta: new Map() });
};

export const collapsedTreeRowsGetter = (getCollapsedRows, { collapsedRowsMeta }) =>
  row => collapsedRowsMeta.get(row) || (getCollapsedRows && getCollapsedRows(row));

export const isLeafTreeRowGetter = ({ leafsMeta }) =>
  row => leafsMeta.get(row) === undefined;
