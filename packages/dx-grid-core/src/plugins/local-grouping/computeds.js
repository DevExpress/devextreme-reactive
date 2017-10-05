import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import { GRID_GROUP_TYPE } from './constants';

const defaultColumnIdentity = value => ({
  key: String(value),
  value,
});

export const groupedGridRows = (
  gridRows,
  grouping,
  getCellValue,
  getColumnIdentity,
) => {
  if (!grouping.length) return gridRows;

  const { columnName } = grouping[0];
  const groupIdentity = (getColumnIdentity && getColumnIdentity(columnName))
    || defaultColumnIdentity;
  const groups = gridRows
    .reduce((acc, gridRow) => {
      const { row } = gridRow;
      const { key, value = key } = groupIdentity(getCellValue(row, columnName), row);
      const sameKeyItems = acc.get(key);

      if (!sameKeyItems) {
        acc.set(key, [value, key, [gridRow]]);
      } else {
        sameKeyItems[2].push(gridRow);
      }
      return acc;
    }, new Map());

  const nestedGrouping = grouping.slice(1);
  return [...groups.values()]
    .map(([value, key, items]) => ({
      value,
      key,
      items: groupedGridRows(items, nestedGrouping, getCellValue, getColumnIdentity),
    }));
};

export const expandedGroupGridRows = (gridRows, grouping, expandedGroups, keyPrefix = '') => {
  if (!grouping.length) return gridRows;

  const nestedGrouping = grouping.slice(1);
  return gridRows.reduce((acc, { value, key: groupKey, items }) => {
    const groupedBy = grouping[0].columnName;
    const key = `${keyPrefix}${groupKey}`;
    const expanded = expandedGroups.has(key);
    return [
      ...acc,
      {
        headerKey: `${GRID_GROUP_TYPE}_${groupedBy}`,
        type: GRID_GROUP_TYPE,
        groupedBy,
        row: { key, value },
      },
      ...expanded
        ? expandedGroupGridRows(items, nestedGrouping, expandedGroups, `${key}${GROUP_KEY_SEPARATOR}`)
        : [],
    ];
  }, []);
};
