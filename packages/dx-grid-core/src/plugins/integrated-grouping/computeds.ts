import { PureComputed } from '@devexpress/dx-core';
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
  GroupsGetterFn,
} from '../../types';
import { getGroupRows, getIntegratedGroups } from './helpers';

export const groupRowChecker: IsSpecificRowFn = row => row[GRID_GROUP_CHECK];

export const groupRowLevelKeyGetter = (row: Row) => (row ? row[GRID_GROUP_LEVEL_KEY] : undefined);

export const groupedRows: GroupedRowsFn = (
  rows, grouping, getCellValue, getColumnCriteria,
) => {
  const groupsGetter: GroupsGetterFn = (currentRows, currentGrouping, prefix) =>
    getIntegratedGroups(
      currentRows,
      currentGrouping,
      prefix,
      getCellValue,
      getColumnCriteria,
    );
  return getGroupRows(rows, grouping, groupsGetter);
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
