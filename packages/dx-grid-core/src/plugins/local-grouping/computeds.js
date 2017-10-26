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

export const groupTree = rows => rows.reduce((acc, row) => {
  const { key: groupKey } = row;
  const { processed, groupKeys } = acc;

  if (groupRowChecker(row)) {
    const groupRow = { groupRow: row, items: [] };

    if (!groupKeys.size) {
      processed.push(groupRow);
    } else {
      const parentKey = groupKey.replace(`${GROUP_KEY_SEPARATOR}${row.value}`, '');
      const parent = groupKeys.get(parentKey);

      if (parent) {
        parent.items.push(groupRow);
      } else {
        processed.push(groupRow);
      }
    }

    groupKeys.set(groupKey, groupRow);
  } else if (!groupKeys.size) {
    processed.push(row);
  } else {
    const parentKey = Array.from(groupKeys.keys())[groupKeys.size - 1];
    groupKeys.get(parentKey).items.push(row);
  }
  return acc;
}, { processed: [], groupKeys: new Map() }).processed;

export const unwrappedGroupTree = (tree, processed = []) => {
  const result = tree.reduce((acc, item) => {
    const { groupRow, items } = item;

    if (groupRow) {
      acc.push(groupRow);
      if (items && items.length) {
        unwrappedGroupTree(items, acc);
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, processed);

  return result;
};
