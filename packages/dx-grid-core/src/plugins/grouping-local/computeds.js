import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';

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

  const columnGrouping = grouping[0];
  const { columnName } = columnGrouping;
  const groupIdentity = (getColumnIdentity && getColumnIdentity(columnName))
    || defaultColumnIdentity;

  const groups = rows
    .reduce((acc, row) => {
      const cellValue = getCellValue(row, columnName);
      const group = groupIdentity(cellValue, row);

      const { key } = group;
      let { value } = group;
      if (!value) {
        value = key;
      }

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
        _headerKey: `groupRow_${groupedBy}`,
        type: 'groupRow',
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
