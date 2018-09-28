import { GROUP_KEY_SEPARATOR } from '../grouping-state/constants';
import {
  GRID_GROUP_TYPE,
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
} from '../integrated-grouping/constants';

export const customGroupedRows = (
  currentRows,
  grouping,
  getChildGroups,
  rootRows = currentRows,
  keyPrefix = '',
) => {
  if (!currentRows || !currentRows.length) return [];
  if (!grouping.length) return currentRows;

  const groupedBy = grouping[0].columnName;
  const nestedGrouping = grouping.slice(1);
  return getChildGroups(currentRows, grouping[0], rootRows)
    .reduce((acc, { key, value = key, childRows }) => {
      const compoundKey = `${keyPrefix}${key}`;
      acc.push({
        [GRID_GROUP_CHECK]: true,
        [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE.toString()}_${groupedBy}`,
        groupedBy,
        compoundKey,
        key,
        value,
      });
      acc.push(...customGroupedRows(
        childRows,
        nestedGrouping,
        getChildGroups,
        rootRows,
        `${compoundKey}${GROUP_KEY_SEPARATOR}`,
      ));
      return acc;
    }, []);
};

export const customGroupingRowIdGetter = (getRowId, rows) => {
  const firstRow = rows.find(row => !row[GRID_GROUP_CHECK]);
  if (!firstRow || getRowId(firstRow) !== undefined) {
    return getRowId;
  }
  const map = new Map(rows
    .filter(row => !row[GRID_GROUP_CHECK])
    .map((row, rowIndex) => [row, rowIndex]));

  return row => map.get(row);
};
