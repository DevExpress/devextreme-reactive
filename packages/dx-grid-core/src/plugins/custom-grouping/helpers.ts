import { GetCustomGroupsFn } from '../../types';
import {
  GRID_GROUP_CHECK,
  GRID_GROUP_LEVEL_KEY,
  GRID_GROUP_TYPE,
} from '../integrated-grouping/constants';

export const getCustomGroups: GetCustomGroupsFn = (
  rows,
  grouping,
  keyPrefix,
  getChildGroups,
  rootRows,
) => {
  const groupedBy = grouping.columnName;
  return getChildGroups(rows as any[], grouping, rootRows as any[])
    .map(({ key, value = key, childRows }) => ({
      groupedBy,
      compoundKey: `${keyPrefix}${key}`,
      key,
      value,
      [GRID_GROUP_CHECK]: true,
      [GRID_GROUP_LEVEL_KEY]: `${GRID_GROUP_TYPE.toString()}_${groupedBy}`,
      childRows,
    }));
};
