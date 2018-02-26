import { TABLE_BAND_TYPE } from './constants';

export const tableRowsWithBands = (headerRows, bandColumns) => {
  const bandRows = [];
  bandColumns.forEach((row, index) => bandRows.push({
    key: TABLE_BAND_TYPE, type: TABLE_BAND_TYPE, level: index,
  }));
  return [...bandRows, ...headerRows];
};
