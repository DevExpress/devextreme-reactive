const types = {
  count: rows => rows.length,
  sum: (rows, getValue) => rows.reduce((acc, row) => acc + getValue(row), 0),
  max: (rows, getValue) => rows.reduce((acc, row) => Math.max(acc, getValue(row)), -Infinity),
  min: (rows, getValue) => rows.reduce((acc, row) => Math.min(acc, getValue(row)), Infinity),
  avg: (rows, getValue) => rows.reduce((acc, row) => acc + getValue(row), 0) / rows.length,
};

const rowsSummary = (rows, summaryItems, getCellValue) =>
  summaryItems.reduce((acc, { type, columnName }) => {
    const getValue = row => getCellValue(row, columnName);
    acc.push(types[type](rows, getValue));
    return acc;
  }, []);

export const totalSummary = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
  getCollapsedRows,
) => {
  const plainRows = rows.reduce((acc, row) => {
    if (getRowLevelKey && getRowLevelKey(row)) {
      if (!isGroupRow || !isGroupRow(row)) {
        acc.push(row);
      }
      const collapsedRows = getCollapsedRows && getCollapsedRows(row);
      if (collapsedRows) {
        acc.push(...collapsedRows);
      }
      return acc;
    }
    acc.push(row);
    return acc;
  }, []);
  return rowsSummary(plainRows, summaryItems, getCellValue);
};

export const groupSummaries = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
) => {
  let levels = [];
  const summaries = rows.reduce((acc, row) => {
    const levelKey = getRowLevelKey(row);
    if (levelKey) {
      const levelIndex = levels.findIndex(level => level.levelKey === levelKey);
      if (levelIndex > -1) {
        levels.slice(levelIndex).forEach((level) => {
          acc[level.row.compoundKey] = rowsSummary(level.rows, summaryItems, getCellValue);
        });
        levels = levels.slice(0, levelIndex);
      }
      if (isGroupRow(row)) {
        levels.push({
          levelKey,
          row,
          rows: [],
        });
      }
    } else {
      levels.forEach((level) => {
        level.rows.push(row);
      });
    }
    return acc;
  }, {});
  levels.forEach((level) => {
    summaries[level.row.compoundKey] = rowsSummary(level.rows, summaryItems, getCellValue);
  });
  return summaries;
};
