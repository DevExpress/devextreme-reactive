export const rowsToTree = (rows, isGroupRow, getRowLevelKey) => {
  if (!rows.length) return rows;

  let currentLevel;
  const levels = {};
  const parentLevels = {};

  return rows.reduce((acc, row) => {
    if (isGroupRow(row)) {
      const currentRowKey = getRowLevelKey(row);
      if (!acc.length) {
        levels[currentRowKey] = acc;
        currentLevel = { groupRow: row, items: [] };
        levels[currentRowKey].push(currentLevel);
      } else if (!levels[currentRowKey]) {
        const parentKey = getRowLevelKey(currentLevel.groupRow);
        currentLevel = { groupRow: row, items: [] };
        levels[currentRowKey] = [currentLevel];
        levels[parentKey].slice(-1)[0].items.push(currentLevel);
        parentLevels[currentRowKey] = parentKey;
      } else {
        const parentKey = parentLevels[currentRowKey];
        currentLevel = { groupRow: row, items: [] };
        levels[currentRowKey].push(currentLevel);
        if (parentKey) {
          levels[parentKey].slice(-1)[0].items.push(currentLevel);
        }
      }
    } else {
      currentLevel.items.push(row);
    }

    return acc;
  }, []);
};

export const treeToRows = (tree, rows = []) => {
  if (!tree.length) return tree;
  return tree.reduce((acc, item) => {
    const { groupRow, items } = item;

    if (groupRow) {
      acc.push(groupRow);
      if (items && items.length) {
        treeToRows(items, acc);
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, rows);
};
