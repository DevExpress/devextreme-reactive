const defaultSummaryCalculators = {
  count: rows => rows.length,
  sum: (rows, getValue) => rows.reduce((acc, row) => acc + getValue(row), 0),
  max: (rows, getValue) => (rows.length
    ? rows.reduce((acc, row) => Math.max(acc, getValue(row)), -Infinity)
    : null),
  min: (rows, getValue) => (rows.length
    ? rows.reduce((acc, row) => Math.min(acc, getValue(row)), Infinity)
    : null),
  avg: (rows, getValue) => (rows.length
    ? rows.reduce((acc, row) => acc + getValue(row), 0) / rows.length
    : null),
};

export const defaultSummaryCalculator = (type, rows, getValue) => {
  const summaryCalculator = defaultSummaryCalculators[type];
  if (!summaryCalculator) {
    throw new Error(`The summary type '${type}' is not defined`);
  }
  return summaryCalculator(rows, getValue);
};

const rowsSummary = (rows, summaryItems, getCellValue, calculator) => summaryItems
  .reduce((acc, { type, columnName }) => {
    const getValue = row => getCellValue(row, columnName);
    acc.push(calculator(type, rows, getValue));
    return acc;
  }, []);

export const totalSummaryValues = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
  getCollapsedRows,
  calculator = defaultSummaryCalculator,
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
  return rowsSummary(plainRows, summaryItems, getCellValue, calculator);
};

export const groupSummaryValues = (
  rows,
  summaryItems,
  getCellValue,
  getRowLevelKey,
  isGroupRow,
  calculator = defaultSummaryCalculator,
) => {
  let levels = [];
  const summaries = {};
  rows.forEach((row) => {
    const levelKey = getRowLevelKey(row);
    if (!levelKey) {
      levels.forEach((level) => {
        level.rows.push(row);
      });
    }
    const levelIndex = levels.findIndex(level => level.levelKey === levelKey);
    if (levelIndex > -1) {
      levels.slice(levelIndex).forEach((level) => {
        summaries[level.row.compoundKey] = rowsSummary(
          level.rows, summaryItems, getCellValue, calculator,
        );
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
  }, {});
  levels.forEach((level) => {
    summaries[level.row.compoundKey] = rowsSummary(
      level.rows, summaryItems, getCellValue, calculator,
    );
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
  calculator = defaultSummaryCalculator,
) => {
  let levels = [];
  const summaries = {};
  rows.forEach((row) => {
    const levelKey = getRowLevelKey(row);
    if (!levelKey) {
      levels[levels.length - 1].rows.push(row);
      return;
    }
    const levelIndex = levels.findIndex(level => level.levelKey === levelKey);
    if (levelIndex > -1) {
      levels.slice(levelIndex).forEach((level) => {
        if (level.rows.length) {
          summaries[getRowId(level.row)] = rowsSummary(
            level.rows, summaryItems, getCellValue, calculator,
          );
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
  }, {});
  levels.forEach((level) => {
    if (level.rows.length) {
      summaries[getRowId(level.row)] = rowsSummary(
        level.rows, summaryItems, getCellValue, calculator,
      );
    }
  });
  return summaries;
};
