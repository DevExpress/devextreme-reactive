import { TABLE_BAND_TYPE } from './constants';

export const tableRowsWithBands = (tableHeaderRows, bandColumns) => {
  let maxLevel = 0;

  const maxNestedLevel = (bands, level) => {
    bands.forEach((column) => {
      if (column.nested !== undefined) {
        maxNestedLevel(column.nested, level + 1);
      } if (level > maxLevel) {
        maxLevel = level;
      }
    });
  };
  maxNestedLevel(bandColumns, 0);

  const tableBandRows = Array.from({ length: maxLevel })
    .map((_, index) => ({ key: `${TABLE_BAND_TYPE}_${index}`, type: TABLE_BAND_TYPE, level: index }));
  return [...tableBandRows, ...tableHeaderRows];
};
