export const rowsToTree = (rows, isNode, getNodeLevelKey) => {
  if (!rows.length) return rows;

  let currentLevel;
  const levels = {};
  const parentKeys = {};

  return rows.reduce((acc, row) => {
    if (isNode(row)) {
      const currentNodeKey = getNodeLevelKey(row);
      if (!acc.length) {
        levels[currentNodeKey] = acc;
        currentLevel = { node: row, items: [] };
        levels[currentNodeKey].push(currentLevel);
        return acc;
      }
      if (!levels[currentNodeKey]) {
        const parentKey = getNodeLevelKey(currentLevel.node);
        currentLevel = { node: row, items: [] };
        levels[currentNodeKey] = [currentLevel];
        levels[parentKey].slice(-1)[0].items.push(currentLevel);
        parentKeys[currentNodeKey] = parentKey;
        return acc;
      }

      currentLevel = { node: row, items: [] };
      levels[currentNodeKey].push(currentLevel);
      const parentKey = parentKeys[currentNodeKey];
      if (parentKey) {
        levels[parentKey].slice(-1)[0].items.push(currentLevel);
      }

      return acc;
    }

    currentLevel.items.push(row);

    return acc;
  }, []);
};

export const treeToRows = (tree, rows = []) => {
  if (!tree.length) return tree;
  return tree.reduce((acc, item) => {
    const { node, items } = item;

    if (node) {
      acc.push(node);
      if (items && items.length) {
        treeToRows(items, acc);
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, rows);
};
