import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';

const defaultGetGroupValue = value => value;
const defaultGetGroupKey = value => String(value);

export const groupedRows = (
  rows,
  grouping,
  getCellValue,
  getGroupValue = defaultGetGroupValue,
  getGroupKey = defaultGetGroupKey,
) => {
  if (!grouping.length) return rows;

  const columnGrouping = grouping[0];
  const groups = rows
    .reduce((acc, row) => {
      const { rowData } = row;
      const value = getGroupValue(
        getCellValue(rowData, columnGrouping.columnName),
        columnGrouping,
        rowData,
      );
      const key = getGroupKey(value, columnGrouping, rowData);
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
      items: groupedRows(items, nestedGrouping, getCellValue, getGroupValue, getGroupKey),
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
        headerKey: `groupRow_${groupedBy}`,
        type: 'groupRow',
        groupedBy,
        rowData: { key, value },
      },
      ...expanded
        ? expandedGroupRows(items, nestedGrouping, expandedGroups, `${key}${GROUP_KEY_SEPARATOR}`)
        : [],
    ];
  }, []);
};
