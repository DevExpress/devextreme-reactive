export const tableRowsWithBands = (tableHeaderRows, bandColumns) => {
  let maxLevel = 0;

  const maxBandLevel = (bands, level) => {
    bands.forEach((column) => {
      if (column.nested !== undefined) {
        maxBandLevel(column.nested, level + 1);
      } if (level > maxLevel) {
        maxLevel = level;
      }
    });
  };
  maxBandLevel(bandColumns, 0);

  const tableBandRows = Array.from({ length: maxLevel })
    .map((_, index) => ({ key: `band_${index}`, type: 'band', level: index }));
  return [...tableBandRows, ...tableHeaderRows];
};
