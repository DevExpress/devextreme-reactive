import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
} from './constants';

export const groupRowChecker = row => row[GRID_GROUP_CHECK];

export const groupRowLevelKeyGetter = row => row[GRID_GROUP_LEVEL_KEY];

const defaultColumnIdentity = value => ({
  key: String(value),
  value,
});

export const groupedRows = (
  rows,
  grouping,
  getCellValue,
  getColumnIdentity,
) => {
  if (!grouping.length) return rows;

  const { columnName } = grouping[0];
  const groupIdentity = (getColumnIdentity && getColumnIdentity(columnName))
    || defaultColumnIdentity;
  const groups = rows
    .reduce((acc, row) => {
      const { key, value = key } = groupIdentity(getCellValue(row, columnName), row);
      const sameKeyItems = acc.get(key);

      if (!sameKeyItems) {
        acc.set(key, [value, key, [row]]);
      } else {
        sameKeyItems[2].push(row);
      }
      return acc;
    }, new Map());

  const nestedGrouping = grouping.slice(1);
  return [...groups.values()]
    .map(([value, key, items]) => ({
      value,
      key,
      items: groupedRows(items, nestedGrouping, getCellValue, getColumnIdentity),
    }));
};

export const expandedGroupRows = (rows, grouping, expandedGroups, keyPrefix = '') => {
  if (!grouping.length) return rows;

  const nestedGrouping = grouping.slice(1);
  return rows.reduce((acc, { value, key: groupKey, items }) => {
    const groupedBy = grouping[0].columnName;
    const key = `${keyPrefix}${groupKey}`;
    const expanded = expandedGroups.has(key);
    return [
      ...acc,
      {
        [GRID_GROUP_CHECK]: true,
        [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE}_${groupedBy}`,
        groupedBy,
        key,
        value,
      },
      ...expanded
        ? expandedGroupRows(items, nestedGrouping, expandedGroups, `${key}${GROUP_KEY_SEPARATOR}`)
        : [],
    ];
  }, []);
};
