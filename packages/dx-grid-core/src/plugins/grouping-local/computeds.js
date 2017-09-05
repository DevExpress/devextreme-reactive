import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';

export const groupedRows = (rows, grouping, getCellData, userGroupFn) => {
  debugger;

  if (!grouping.length) return rows;

  const columnName = grouping[0].columnName;
  const groupFn = userGroupFn &&
    userGroupFn()[columnName] ? userGroupFn()[columnName] : value => value;

  const groups = rows
    .reduce((acc, row) => {
      const value = groupFn(getCellData(row, grouping[0].columnName)); // added groupFn()

      const key = String(value);
      const sameKeyItems = acc.get(key);
      if (!sameKeyItems) {
        acc.set(key, [value, [row]]);
      } else {
        sameKeyItems[1].push(row);
      }
      return acc;
    }, new Map());

  const nestedGrouping = grouping.slice(1);
  return [...groups.values()]
    .map(([value, items]) => ({
      value,
      items: groupedRows(items, nestedGrouping, getCellData, userGroupFn),
    }));
};

export const expandedGroupRows = (rows, grouping, expandedGroups, keyPrefix = '') => {
  if (!grouping.length) return rows;

  const nestedGrouping = grouping.slice(1);
  return rows.reduce((acc, { value, items }) => {
    const groupedBy = grouping[0].columnName;
    const key = `${keyPrefix}${String(value)}`;
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
