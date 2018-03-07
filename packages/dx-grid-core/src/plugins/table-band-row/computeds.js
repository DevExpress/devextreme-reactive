import { TABLE_BAND_TYPE } from './constants';

export const tableRowsWithBands = (headerRows, bandColumns) => {
  const bandRows = [];

  // two parts func
  bandColumns.forEach((row) => {
    if (bandRows.filter(object => object.level === row.level).length === 0) {
      bandRows.push({
        key: `${TABLE_BAND_TYPE}-${row.level}`, type: TABLE_BAND_TYPE, level: row.level,
      });
    }
  });

  return [...bandRows, ...headerRows];
};

export const nestedValue = (tree, acc) => {
  tree.forEach((point) => {
    if (point.columns !== undefined) {
      acc = nestedValue(point.columns, acc);
    } else {
      acc += 1;
    }
  });

  return acc;
};

const treeFunction = (linearBandColumns, level, treeBandColumns) => {
  treeBandColumns.forEach((column) => {
    if (column.columns !== undefined) {
      treeFunction(linearBandColumns, level + 1, column.columns);
    }
    const title = column.title || column.name;
    const children = column.columns ? nestedValue(column.columns, 0) : 1; // twice tree processing =/
    linearBandColumns.push({
      name: column.name,
      title,
      level,
      children,
    });
  });
};

export const getLinearBandColumns = (treeBandColumns) => {
  const linearBandColumns = [];
  treeFunction(linearBandColumns, 0, treeBandColumns);
  return linearBandColumns;
};

export const addBandRows = (tableHeaderRows, bandColumns) => {
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
