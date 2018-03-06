import { TABLE_BAND_TYPE } from './constants';

export const tableRowsWithBands = (headerRows, bandColumns) => {
  const bandRows = [];

  // create band array. its length = maxNestedLevel
  bandColumns.forEach((row, index) => {
    if (bandRows.filter(object => object.level === row.level).length === 0) {
      bandRows.push({
        key: `${TABLE_BAND_TYPE}-${index}`, type: TABLE_BAND_TYPE, level: row.level,
      });
    }
  });

  return [...bandRows, ...headerRows];
};
