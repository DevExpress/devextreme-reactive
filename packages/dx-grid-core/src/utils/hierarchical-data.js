export const rowsToTree = (rows, isGroupRow, getRowLevelKey) => {
  if (!rows.length) return rows;

  let level;
  const levels = {};
  const parentLevels = {};
  return rows.reduce((acc, row) => {
    if (isGroupRow(row)) {
      const currentRowKey = getRowLevelKey(row);
      if (!acc.length) {
        levels[currentRowKey] = acc;
        level = { groupRow: row, items: [] };
        levels[currentRowKey].push(level);
      } else {
        // eslint-disable-next-line
        if (!levels[currentRowKey]) {
          const parentKey = getRowLevelKey(level.groupRow);
          level = { groupRow: row, items: [] };
          levels[currentRowKey] = [level];
          levels[parentKey].slice(-1)[0].items.push(level);
          parentLevels[currentRowKey] = parentKey;
        } else {
          const parentKey = parentLevels[currentRowKey];
          level = { groupRow: row, items: [] };
          levels[currentRowKey].push(level);
          if (parentKey) {
            levels[parentKey].slice(-1)[0].items.push(level);
          }
        }
      }
    } else {
      level.items.push(row);
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
