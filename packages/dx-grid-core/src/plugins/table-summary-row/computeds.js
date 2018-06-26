export const tableRowsWithSummaries = (tableRows, getRowLevelKey, isGroupRow) => {
  if (!getRowLevelKey) return tableRows;

  let levels = [];
  const result = tableRows.reduce((acc, tableRow) => {
    const { row } = tableRow;
    const levelKey = getRowLevelKey(row);
    if (levelKey) {
      const levelIndex = levels.findIndex(level => level.levelKey === levelKey);
      if (levelIndex > -1) {
        levels.slice(levelIndex).forEach((level) => {
          if (!level.opened) return;
          const { compoundKey } = level.row;
          acc.push({ key: `groupSummary_${compoundKey}`, type: 'groupSummary', compoundKey });
        });
        levels = levels.slice(0, levelIndex);
      }
      if (isGroupRow && isGroupRow(row)) {
        levels.push({
          levelKey,
          row,
          opened: false,
        });
      }
    } else {
      levels.forEach((level) => {
        // eslint-disable-next-line no-param-reassign
        level.opened = true;
      });
    }
    acc.push(tableRow);
    return acc;
  }, []);
  levels.forEach((level) => {
    if (!level.opened) return;
    const { compoundKey } = level.row;
    result.push({ key: `groupSummary_${compoundKey}`, type: 'groupSummary', compoundKey });
  });
  return result;
};
