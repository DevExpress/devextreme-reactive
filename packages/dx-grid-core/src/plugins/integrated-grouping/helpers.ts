import { GetGroupsFn } from '../../types';
import { GRID_GROUP_CHECK, GRID_GROUP_LEVEL_KEY, GRID_GROUP_TYPE } from './constants';

const defaultColumnCriteria = (value: any) => ({
  value,
  key: String(value),
});

export const getGroupRows: GetGroupsFn = (
  rows,
  grouping,
  getCellValue,
  getColumnCriteria,
  keyPrefix,
  level,
) => {
  const { columnName } = grouping[level];
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

  const groupedBy = columnName;
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
        items,
      });
      return acc;
    }, []);
};
