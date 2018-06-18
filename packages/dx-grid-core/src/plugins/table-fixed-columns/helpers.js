import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';

export const isFixedCell = (columnName, beforeColumnNames, afterColumnNames) =>
  (beforeColumnNames.indexOf(columnName) > -1
    || afterColumnNames.indexOf(columnName) > -1);

export const getFixedPosition = (columnName, beforeColumnNames, afterColumnNames) => {
  const beforePosition = beforeColumnNames.indexOf(columnName);
  if (beforePosition > -1) {
    return { side: FIXED_COLUMN_BEFORE_SIDE, index: beforePosition };
  }
  return {
    side: FIXED_COLUMN_AFTER_SIDE,
    index: afterColumnNames.indexOf(columnName),
  };
};
