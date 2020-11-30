import { GetIntegratedGroupsFn, GetGroupRowsFn, Row } from '../../types';
import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import { GRID_GROUP_CHECK, GRID_GROUP_LEVEL_KEY, GRID_GROUP_TYPE } from './constants';

const defaultColumnCriteria = (value: any) => ({
  value,
  key: String(value),
});

export const getGroupRows: GetGroupRowsFn = (
  rows, grouping, groupsGetter,
) => {
  const keyPrefixes = [{ prefix: '', level: 0, rows }];
  const resultRows = [] as Row[];
  const compoundKeys = {};

  while (keyPrefixes.length) {
    const { prefix: keyPrefix, level, rows: currentRows } = keyPrefixes.pop()!;

    const groupRows: readonly Row[] = grouping[level] && currentRows.length
      ? groupsGetter(currentRows, grouping[level], keyPrefix)
          .map(({ childRows, ...params }: any) => {
            const { compoundKey } = params;
            keyPrefixes.push({
              prefix: `${compoundKey}${GROUP_KEY_SEPARATOR}`,
              level: level + 1,
              rows: childRows || [],
            });
            return params;
          })
      : currentRows;

    const currentCompoundKey = keyPrefix.slice(0, keyPrefix.length - 1);
    const groupIndex = compoundKeys[currentCompoundKey] ?? -1;
    groupRows.forEach((row, rowIndex) => {
      if (row.compoundKey) {
        compoundKeys[row.compoundKey] = groupIndex + 1 + rowIndex;
      }
    });

    if (groupIndex > -1) {
      resultRows.splice(groupIndex + 1, 0, ...groupRows);
    } else {
      resultRows.push(...groupRows);
    }
  }

  return resultRows;
};

export const getIntegratedGroups: GetIntegratedGroupsFn = (
  rows,
  grouping,
  keyPrefix,
  getCellValue,
  getColumnCriteria,
) => {
  const { columnName } = grouping;
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
    .map(([value, key, childRows]) => ({
      groupedBy,
      compoundKey: `${keyPrefix}${key}`,
      key,
      value,
      [GRID_GROUP_CHECK]: true,
      [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE.toString()}_${groupedBy}`,
      childRows,
    }));
};
