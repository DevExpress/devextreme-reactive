import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';

export const isFixedCell = (columnName, beforeColumnNames, afterColumnNames) => (
  beforeColumnNames.indexOf(columnName) > -1 || afterColumnNames.indexOf(columnName) > -1
);

export const getFixedSide = (columnName, beforeColumnNames, afterColumnNames) => {
  if (beforeColumnNames.indexOf(columnName) > -1) return FIXED_COLUMN_BEFORE_SIDE;
  if (afterColumnNames.indexOf(columnName) > -1) return FIXED_COLUMN_AFTER_SIDE;
  return null;
};
