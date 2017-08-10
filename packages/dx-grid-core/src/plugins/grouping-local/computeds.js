import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import { getColumnByName } from '../../utils/columns';

export const groupedRows = (rows, columns, grouping, getCellData) => {
  if (!grouping.length) return rows;

  const groups = rows
    .reduce((acc, row) => {
      const column = getColumnByName(columns, grouping[0].columnName);
      const value = getCellData(row, column);
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
      items: groupedRows(items, columns, nestedGrouping, getCellData),
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
