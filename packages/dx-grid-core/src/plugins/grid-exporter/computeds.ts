import {
  OutlineLevelsFn, FilterSelectedRowsFn, GetRowsToExportFn, Row, BuildGroupTreeFn,
  GetExportSummaryFn, GetCloseGroupFn, Grouping,
} from '../../types';
import { PureComputed } from '@devexpress/dx-core';
import { ROOT_GROUP } from './constants';
import { exportSummaryItems, removeEmptyGroups } from './helpers';

export const groupOutlineLevels: OutlineLevelsFn = grouping => (
  grouping?.reduce((acc, { columnName }, index) => ({
    ...acc,
    [columnName]: index,
  }), {}) || {}
);

const filterSelectedRows: FilterSelectedRowsFn = (rows, selection, getRowId, isGroupRow) => {
  const selectionSet = new Set<any>(selection);
  return rows.filter(row => isGroupRow(row) || selectionSet.has(getRowId(row)));
};

export const rowsToExport: GetRowsToExportFn = (
  rows, selection, grouping, getCollapsedRows, getRowId, isGroupRow,
) => {
  const expandRows: PureComputed<[Row[]]> = collapsedRows => (
    collapsedRows.reduce((acc, row) => (
      [...acc, row, ...(expandRows(getCollapsedRows(row) || []))]
    ), [])
  );

  const expandedRows = getCollapsedRows ? expandRows(rows) : rows;

  if (!!selection) {
    const filteredRows = filterSelectedRows(expandedRows, selection, getRowId, isGroupRow);
    return removeEmptyGroups(filteredRows, grouping, isGroupRow);
  }
  return expandedRows;
};

export const buildGroupTree: BuildGroupTreeFn = (
  rows, outlineLevels, grouping, isGroupRow, groupSummaryItems,
) => {
  const groupTree = { [ROOT_GROUP]: [] as any[] };

  if (!(grouping && grouping.length)) {
    groupTree[ROOT_GROUP] = [0, rows.length - 1];
    return groupTree;
  }

  const maxLevel = Object.keys(outlineLevels).length - 1;
  const groupSummaryExists = !!groupSummaryItems;
  const parentChain = { '-1': ROOT_GROUP };
  let lastDataIndex = 0;
  let openGroup = '';
  let index = 0;
  let level = 0;
  let prevLevel = 0;

  rows.forEach((row) => {
    const { groupedBy, compoundKey } = row;
    if (isGroupRow(row)) {
      level = outlineLevels[groupedBy];
      groupTree[compoundKey] = [];
      parentChain[level] = compoundKey;
      if (level <= maxLevel) {
        groupTree[parentChain[level - 1]].push(compoundKey);
      }
      if (level === maxLevel) {
        if (openGroup) {
          // close previous group
          groupTree[openGroup].push(lastDataIndex);
        }
        openGroup = compoundKey;
        if (groupSummaryExists && lastDataIndex > 0) {
          index += 1;
        }
        groupTree[compoundKey].push(index + 1); // first row index
      } else if (groupSummaryExists && level < prevLevel) {
        // jump over summary rows
        index += maxLevel - level;
      }
      prevLevel = level;
    } else {
      lastDataIndex = index;
    }
    index += 1;
  });

  if (openGroup) {
    groupTree[openGroup].push(lastDataIndex);
  }

  return groupTree;
};

const operations = {
  count: 'COUNTA',
};
export const exportSummaryGetter: GetExportSummaryFn = (
  worksheet, dataColumns, customizeSummaryCell, defaultSummaryMessages,
) => (
  { columnName, type }, ranges,
) => {
  const row = worksheet.lastRow!;
  const letter = worksheet.getColumn(columnName).letter;
  const operation = operations[type] || type.toUpperCase();
  const rangesStr = ranges.map(range => (
    range
      .map(r => `${letter}${r}`)
      .filter((val, index, arr) => arr.indexOf(val) === index)
      .join(':')
  )).join(',');

  const cell = row.getCell(columnName);
  cell.value = {
    formula: `${operation}(${rangesStr})`,
    date1904: false,
  };
  cell.numFmt = `"${defaultSummaryMessages[type]}:" 0`;

  const column = dataColumns.find(({ name }) => name === columnName);
  const summary = {
    type,
    ranges,
  };
  customizeSummaryCell(cell, column!, summary);
};

export const closeGroupGetter: GetCloseGroupFn = (
  worksheet, groupTree, outlineLevels, maxGroupLevel, groupSummaryItems, exportSummary,
) => rowsOffset => (group) => {
  const { groupedBy, compoundKey } = group;

  exportSummaryItems(
    worksheet, groupTree, groupSummaryItems, compoundKey, outlineLevels[groupedBy],
    rowsOffset, maxGroupLevel, exportSummary,
  );
};

export const maximumGroupLevel: PureComputed<[Grouping[]], number> = grouping => (
  (grouping || []).length - 1
);
