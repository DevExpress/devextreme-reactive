import { PureComputed } from '@devexpress/dx-core';
import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
  GRID_GROUP_COLLAPSED_ROWS,
} from './constants';
import {
  Grouping, GroupKey, Row, GetCollapsedRowsFn, IsSpecificRowFn, GroupedRowsFn,
} from '../../types';

export const groupRowChecker: IsSpecificRowFn = row => row[GRID_GROUP_CHECK];

export const groupRowLevelKeyGetter = (row: Row) => (row ? row[GRID_GROUP_LEVEL_KEY] : undefined);

const defaultColumnCriteria = (value: any) => ({
  value,
  key: String(value),
});

export const groupedRows: GroupedRowsFn = (
  rows, grouping, getCellValue, getColumnCriteria, keyPrefix = '',
) => {
  if (!grouping.length) return rows;

  const { columnName } = grouping[0];
  const groupCriteria = (getColumnCriteria && getColumnCriteria(columnName))
    || defaultColumnCriteria;

  const groups = new Map();
  rows.forEach((row) => {
    const rawValue = getCellValue(row, columnName);
    const { key, value } = groupCriteria(rawValue, row);
    const sameKeyItems = groups.get(key);

    if (!sameKeyItems) {
      const groupingValue = value === rawValue ? value : value || key;
      groups.set(key, [groupingValue, key, [row]]);
    } else {
      sameKeyItems[2].push(row);
    }
  });

  const groupedBy = grouping[0].columnName;
  const nestedGrouping = grouping.slice(1);
  return [...groups.values()]
    .reduce((acc, [value, key, items]) => {
      const compoundKey = `${keyPrefix}${key}`;
      acc.push({
        groupedBy,
        compoundKey,
        key,
        value,
        [GRID_GROUP_CHECK]: true,
        [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE.toString()}_${groupedBy}`,
      });
      acc.push(...groupedRows(
        items,
        nestedGrouping,
        getCellValue,
        getColumnCriteria,
        `${compoundKey}${GROUP_KEY_SEPARATOR}`,
      ));
      return acc;
    }, []);
};

export const expandedGroupRows: PureComputed<[Row[], Grouping[], GroupKey[]]> = (
  rows,
  grouping,
  expandedGroups,
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

    currentGroupExpanded = expandedGroupsSet.has(row.compoundKey);
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
