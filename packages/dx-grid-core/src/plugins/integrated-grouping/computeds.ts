import { PureComputed } from '@devexpress/dx-core';
import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import {
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
  GRID_GROUP_COLLAPSED_ROWS,
} from './constants';
import {
  Grouping,
  GroupKey,
  Row,
  GetCollapsedRowsFn,
  IsSpecificRowFn,
  GroupedRowsFn,
} from '../../types';
import { getGroupRows } from './helpers';

export const groupRowChecker: IsSpecificRowFn = row => row[GRID_GROUP_CHECK];

export const groupRowLevelKeyGetter = (row: Row) => (row ? row[GRID_GROUP_LEVEL_KEY] : undefined);

export const groupedRows: GroupedRowsFn = (
  rows, grouping, getCellValue, getColumnCriteria,
) => {
  const keyPrefixes = [{ prefix: '', level: 0, items: rows }];
  let resultRows = [] as Row[];

  while (keyPrefixes.length) {
    const { prefix: keyPrefix, level, items: currentItems } = keyPrefixes.shift()!;

    const groupRows = grouping[level]
      ? getGroupRows(currentItems, grouping, getCellValue, getColumnCriteria, keyPrefix, level)
          .map(({ items, ...params }: any) => {
            const { compoundKey } = params;
            keyPrefixes.push({
              prefix: `${compoundKey}${GROUP_KEY_SEPARATOR}`,
              level: level + 1,
              items,
            });
            return params;
          })
      : currentItems;

    const index = resultRows
      .findIndex(row => row.compoundKey === keyPrefix.slice(0, keyPrefix.length - 1));
    if (index > -1) {
      resultRows = [
        ...resultRows.slice(0, index + 1),
        ...groupRows,
        ...resultRows.slice(index + 1),
      ];
    } else {
      resultRows.push(...groupRows);
    }
  }

  return resultRows;
};

export const expandedGroupRows: PureComputed<[Row[], Grouping[], GroupKey[], boolean]> = (
  rows,
  grouping,
  expandedGroups,
  isExporting,
) => {
  if (!grouping.length) return rows;

  const groupingColumnNames = grouping.map(columnGrouping => columnGrouping.columnName);
  const expandedGroupsSet = new Set(expandedGroups);
  let currentGroupExpanded = true;
  let currentGroupLevel = 0;

  return rows.reduce((acc, row) => {
    if (!row[GRID_GROUP_CHECK]) {
      if (currentGroupExpanded) {
        acc.push(row);
      } else {
        acc[acc.length - 1][GRID_GROUP_COLLAPSED_ROWS].push(row);
      }
      return acc;
    }

    const groupLevel = groupingColumnNames.indexOf(row.groupedBy);
    if (groupLevel > currentGroupLevel && !currentGroupExpanded) {
      return acc;
    }

    currentGroupExpanded = expandedGroupsSet.has(row.compoundKey) || isExporting;
    currentGroupLevel = groupLevel;

    if (currentGroupExpanded) {
      acc.push(row);
    } else {
      acc.push({
        ...row,
        [GRID_GROUP_COLLAPSED_ROWS]: [],
      });
    }

    return acc;
  }, []);
};

export const groupCollapsedRowsGetter: PureComputed<[GetCollapsedRowsFn]> =
  getCollapsedRows => row => (
  row[GRID_GROUP_COLLAPSED_ROWS] || (getCollapsedRows && getCollapsedRows(row))
);
