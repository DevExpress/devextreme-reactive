const defaultTypes = {
  count: rows => rows.length,
  sum: (rows, getValue) => rows.reduce((acc, row) => acc + getValue(row), 0),
  max: (rows, getValue) =>
    (rows.length ? rows.reduce((acc, row) => Math.max(acc, getValue(row)), -Infinity) : null),
  min: (rows, getValue) =>
    (rows.length ? rows.reduce((acc, row) => Math.min(acc, getValue(row)), Infinity) : null),
  avg: (rows, getValue) =>
    (rows.length ? rows.reduce((acc, row) => acc + getValue(row), 0) / rows.length : null),
};

const rowsSummary = (rows, summaryItems, getCellValue, types) =>
  summaryItems.reduce((acc, { type, columnName }) => {
    const getValue = row => getCellValue(row, columnName);
    const summary = (types && types[type]) || defaultTypes[type];
    if (!summary) {
      throw new Error(`The summary type '${type}' is undefined`);
    }
    acc.push(summary(rows, getValue));
    return acc;
  }, []);

export const totalSummaryValues = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
  getCollapsedRows,
  types,
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
  return rowsSummary(plainRows, summaryItems, getCellValue, types);
};

export const groupSummaryValues = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
  types,
) => {
  let levels = [];
  const summaries = rows.reduce((acc, row) => {
    const levelKey = getRowLevelKey(row);
    if (levelKey) {
      const levelIndex = levels.findIndex(level => level.levelKey === levelKey);
      if (levelIndex > -1) {
        levels.slice(levelIndex).forEach((level) => {
          acc[level.row.compoundKey] =
            rowsSummary(level.rows, summaryItems, getCellValue, types);
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
    summaries[level.row.compoundKey] =
      rowsSummary(level.rows, summaryItems, getCellValue, types);
  });
  return summaries;
};

export const treeSummaryValues = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
  getRowId,
  types,
) => {
  let levels = [];
  const summaries = rows.reduce((acc, row) => {
    const levelKey = getRowLevelKey(row);
    if (levelKey) {
      const levelIndex = levels.findIndex(level => level.levelKey === levelKey);
      if (levelIndex > -1) {
        levels.slice(levelIndex).forEach((level) => {
          if (level.rows.length) {
            acc[getRowId(level.row)] =
              rowsSummary(level.rows, summaryItems, getCellValue, types);
          }
        });
        levels = levels.slice(0, levelIndex);
      }
      if (!isGroupRow || !isGroupRow(row)) {
        if (levels.length) {
          levels[levels.length - 1].rows.push(row);
        }
        levels.push({
          levelKey,
          row,
          rows: [],
        });
      }
    } else {
      levels[levels.length - 1].rows.push(row);
    }
    return acc;
  }, {});
  levels.forEach((level) => {
    if (level.rows.length) {
      summaries[getRowId(level.row)] =
        rowsSummary(level.rows, summaryItems, getCellValue, types);
    }
  });
  return summaries;
};
