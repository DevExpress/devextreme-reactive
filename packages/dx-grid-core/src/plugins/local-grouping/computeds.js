import {
  GROUP_KEY_SEPARATOR,
} from '../grouping-state/constants';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
} from './constants';

export const groupRowChecker = row => row[GRID_GROUP_CHECK];

export const groupRowLevelKeyGetter = row => row[GRID_GROUP_LEVEL_KEY];

const defaultColumnCriteria = value => ({
  key: String(value),
  value,
});

export const groupedRows = (
  rows,
  grouping,
  getCellValue,
  getColumnCriteria,
  keyPrefix = '',
) => {
  if (!grouping.length) return rows;

  const { columnName } = grouping[0];
  const groupCriteria = (getColumnCriteria && getColumnCriteria(columnName))
    || defaultColumnCriteria;
  const groups = rows
    .reduce((acc, row) => {
      const { key, value = key } = groupCriteria(getCellValue(row, columnName), row);
      const sameKeyItems = acc.get(key);

      if (!sameKeyItems) {
        acc.set(key, [value, key, [row]]);
      } else {
        sameKeyItems[2].push(row);
      }
      return acc;
    }, new Map());

  const groupedBy = grouping[0].columnName;
  const nestedGrouping = grouping.slice(1);
  return [...groups.values()]
    .reduce((acc, [value, key, items]) => {
      const compoundKey = `${keyPrefix}${key}`;
      acc.push({
        [GRID_GROUP_CHECK]: true,
        [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_${groupedBy}`,
        groupedBy,
        compoundKey,
        key,
        value,
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

export const expandedGroupRows = (rows, grouping, expandedGroups) => {
  if (!grouping.length) return rows;

  const groupingColumnNames = grouping.map(columnGrouping => columnGrouping.columnName);
  let currentGroupExpanded = true;
  let currentGroupLevel = 0;

  return rows.reduce((acc, row) => {
    if (!row[GRID_GROUP_CHECK]) {
      if (currentGroupExpanded) {
        acc.push(row);
      } else {
        acc[acc.length - 1].collapsedRows.push(row);
      }
      return acc;
    }

    const groupLevel = groupingColumnNames.indexOf(row.groupedBy);
    if (groupLevel > currentGroupLevel && !currentGroupExpanded) {
      return acc;
    }

    currentGroupExpanded = expandedGroups.has(row.compoundKey);
    currentGroupLevel = groupLevel;

    if (currentGroupExpanded) {
      acc.push(row);
    } else {
      acc.push({
        ...row,
        collapsedRows: [],
      });
    }

    return acc;
  }, []);
};
